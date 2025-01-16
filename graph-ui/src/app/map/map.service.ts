import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

export interface Vehicle {
  name: string;
  capacity: number;
}
  
export interface CargoItem {
  destination: string;
  size: number;
}
  
export interface Route {
  vehicle: Vehicle;
  items: CargoItem[];
}

export interface Routes {
  depot: string;
  routes: Route[];
}


@Injectable({
    providedIn: 'root',
})
export class MapService {
    private readonly routesUrl: string = 'http://localhost:8000/routes';

    constructor(private readonly http: HttpClient) {}

    routes = new BehaviorSubject<Routes | null>(null);

    loadRoutes(depot: string, vehicles: Vehicle[], items: CargoItem[]): void {
        const body = { depot, vehicles, items };
        this.http.post<Routes>(this.routesUrl, body)
            .pipe(
                tap((routes) => {
                    console.log('Loading new routes');
                    console.log(routes);
                }),
            )
            .subscribe((routes) => {
              this.routes.next(routes);
            });
    }

    clearRoutes(): void {
      this.routes.next(null);
    }
}
