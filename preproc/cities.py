import requests

CITIES_FILE = 'cities.txt'
TARGET_FILE = 'cities-geo.txt'

API_URL = 'https://geocoding-api.open-meteo.com/v1/search'

geo_data = []
with open(CITIES_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            city_name = line.strip()

            # Requests automatically encodes the city names so no need to use quote_plus or any other method
            response = requests.get(API_URL, params={'name': city_name, 'count': 10, 'language': 'en', 'format': 'json'})
            results = response.json()['results']
            
            if not len(results):
                print(f'No response for {city_name}')

            city_data = None
            for city in results:
                if city['country_code'] == 'EE':
                    city_data = city
                    break

            if city_data is None:
                print(f'No data for city {city_name}')

            latitude, longitude = city_data['latitude'], city_data['longitude']

            geo_data.append((city_name, latitude, longitude))
        except:
            print(f'Error for city {city_name}')


with open(TARGET_FILE, 'w+', encoding='utf-8') as f:
    f.write('name,latitude,longitude\n')
    for (city_name, latitude, longitude) in geo_data:
        f.write(f'{city_name},{latitude},{longitude}\n')
