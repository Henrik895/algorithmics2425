from typing import List
from pydantic import BaseModel
from haversine import haversine

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import random
import math


class Vehicle(BaseModel):
    name: str
    capacity: int


class CargoItem(BaseModel):
    destination: str
    size: int


class Constraints(BaseModel):
    depot: str
    vehicles: List[Vehicle]
    items: List[CargoItem]


class Route(BaseModel):
    vehicle: Vehicle
    items: CargoItem


# Probably not the best name for a class
class Routes(BaseModel):
    depot: str
    routes: List[Route]


def load_distances():
    """
    Loads the distance data between cities
    """
    geo_file = 'cities-geo.txt'
    geo_data = []
    with open(geo_file, 'r', encoding='utf-8') as f:
        for line in f.readlines()[1:]:
            name, lat, long = line.strip().split(',')
            geo_data.append((name, float(lat), float(long)))

    city_index = []
    distance_matrix = []
    for (city_1, lat_1, long_1) in geo_data:
        city_index.append(city_1)
        city_distances = []
        for (city_2, lat_2, long_2) in geo_data:
            distance = haversine((lat_1, long_1), (lat_2, long_2)) 
            # Add small penalty because road is not straight as an arrow
            distance = round(distance * 1.1)
            city_distances.append(distance)
        
        distance_matrix.append(city_distances)

    return city_index, distance_matrix


def calc_route_length(route: Route, depot: str):
    """
    Calculates the total distance for the entire route (including starting from and finishing at the depot)
    """
    route_cities = [depot] + list(map(lambda x: x.destination, route["items"])) + [depot]
    distance = 0
    for i in range(len(route_cities) - 1):
        distance += distance_matrix[city_index.index(route_cities[i])][city_index.index(route_cities[i + 1])]

    return distance


def shuffle_route(route: Route):
    """
    Reverses the order of destinations between two random array indices
    """
    items = route["items"][:]
    index1 = random.randint(0, len(route["items"]))
    index2 = random.randint(0, len(route["items"]))

    while index1 == index2:
        index2 = random.randint(0, len(route["items"]) - 1)

    low = index1 if index1 < index2 else index2
    high = index1 if index1 > index2 else index2

    items = items[:low] + items[low:high][::-1] + items[high:]

    return { "vehicle": route["vehicle"], "items": items }


def optimize_route(route: Route, depot: str, temperature=500000, stopping_temp=0.001, cooling_rate=0.99):
    """
    Uses simulated annealing for optimizing the route length
    """
    if len(route["items"]) == 1:
        # There is only one stop besides the depot, not possible to optimize
        return route

    current_route = route

    best_route = route
    best_distance = calc_route_length(route, depot)

    while temperature > stopping_temp:
        new_route = shuffle_route(current_route)
        new_dist = calc_route_length(new_route, depot)

        difference = new_dist - best_distance

        if difference < 0 or random.random() < math.exp(-difference / temperature):
            current_route = new_route
            if new_dist < best_distance:
                best_distance = new_dist
                best_route = new_route

        temperature *= cooling_rate

    return best_route


# Some helper methods for cross optimizing routes
def calc_used_capacity(route: Route):
    capacity = sum(list(map(lambda x: x.size, route["items"])))
    return capacity


def is_allowed_route(route: Route):
    used_capacity = calc_used_capacity(route)
    return used_capacity <= route["vehicle"].capacity


def mix_routes(route1: Route, route2: Route):
    index1_1 = random.randint(0, len(route1["items"]) - 1)
    index2_1 = random.randint(0, len(route1["items"]) - 1)

    low_1 = index1_1 if index1_1 < index2_1 else index2_1
    high_1 = index1_1 if index1_1 > index2_1 else index2_1

    index1_2 = random.randint(0, len(route2["items"]) - 1)
    index2_2 = random.randint(0, len(route2["items"]) - 1)

    low_2 = index1_2 if index1_2 < index2_2 else index2_2
    high_2 = index1_2 if index1_2 > index2_2 else index2_2

    items1_start = route1["items"][:low_1]
    items1_center = route1["items"][low_1:high_1]
    items1_end = route1["items"][high_1:]

    items2_start = route2["items"][:low_2]
    items2_center = route2["items"][low_2:high_2]
    items2_end = route2["items"][high_2:]

    new_items1 = items1_start + items2_center + items1_end
    new_items2 = items2_start + items1_center + items2_end

    new_route1 = { "vehicle": route1["vehicle"], "items": new_items1 }
    new_route2 = { "vehicle": route2["vehicle"], "items": new_items2 }

    return new_route1, new_route2


def cross_optimize_routes(routes: List[Route], depot: str, temperature=500000, stopping_temp=0.001, cooling_rate=0.99):
    """
    Uses simulated annealing to try to reduce the total distance travelled across all routes
    """
    if len(routes) <= 1:
        return routes

    current_routes = routes[:]

    best_routes = current_routes[:]
    best_distance = sum([calc_route_length(r, depot) for r in current_routes])

    while temperature > stopping_temp:
        idx_1 = random.randint(0, len(routes) - 1)
        idx_2 = random.randint(0, len(routes) - 1)
        while idx_1 == idx_2:
            idx_2 = random.randint(0, len(routes) - 1)

        new_1, new_2 = mix_routes(current_routes[idx_1], current_routes[idx_2])

        if not (is_allowed_route(new_1) and is_allowed_route(new_2)):
            temperature *= cooling_rate
            continue

        new_routes = current_routes[:]
        new_routes[idx_1] = new_1
        new_routes[idx_2] = new_2

        new_distance = sum([calc_route_length(r, depot) for r in new_routes])

        difference = new_distance - best_distance

        if difference < 0 or random.random() < math.exp(-difference / temperature):
            current_routes = new_routes
            if new_distance < best_distance:
                best_distance = new_distance
                best_routes = new_routes

        temperature *= cooling_rate

    return best_routes


city_index, distance_matrix = load_distances()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/routes")
def read_item(constraints: Constraints):
    # TODO: bin problem, check the feasibility at first
    unused_vehicles = [v for v in constraints.vehicles]
    undelivered_cargo = [c for c in constraints.items]

    routes: List[Route] = []
    while len(undelivered_cargo):
        vehicle = unused_vehicles.pop(0)
        remaining_capacity = vehicle.capacity

        current_location = constraints.depot
        items = []
        while True:
            possible_cargo_idx = [i for i, c in enumerate(undelivered_cargo) if c.size <= remaining_capacity]

            if len(possible_cargo_idx) == 0:
                # There is not possible to add any cargo to this vehicle anymore
                break

            min_index = possible_cargo_idx[0]
            min_distance = distance_matrix[city_index.index(current_location)][city_index.index(undelivered_cargo[min_index].destination)]
            for idx in possible_cargo_idx[1:]:
                cargo_distance =  distance_matrix[city_index.index(current_location)][city_index.index(undelivered_cargo[idx].destination)]
                if cargo_distance < min_distance:
                    min_index = idx
                    min_distance = cargo_distance


            cargo = undelivered_cargo.pop(min_index)
            items.append(cargo)
            remaining_capacity -= cargo.size

            current_location = cargo.destination

        routes.append({ "vehicle": vehicle, "items": items })

    print('Distance before optimization:', sum([calc_route_length(r, constraints.depot) for r in routes]))

    # Routes are optimized before cross optimization in order to help with performance
    for i, route in enumerate(routes):
        routes[i] = optimize_route(route, constraints.depot)

    print('Distance after optimization:', sum([calc_route_length(r, constraints.depot) for r in routes]))

    if len(routes) > 1:
        routes = cross_optimize_routes(routes, constraints.depot)

    print('Distance after cross optimization:', sum([calc_route_length(r, constraints.depot) for r in routes]))

    # Optimize routes again
    for i, route in enumerate(routes):
        routes[i] = optimize_route(route, constraints.depot)

    print('Distance after last optimization:', sum([calc_route_length(r, constraints.depot) for r in routes]))

    return { "depot": constraints.depot, "routes": routes }
