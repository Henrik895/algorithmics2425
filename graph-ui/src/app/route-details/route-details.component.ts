import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MapService, Routes } from '../map/map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-details',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './route-details.component.html',
})
export class RouteDetailsComponent {
  routes$: Observable<Routes | null>;

  constructor(private readonly mapService: MapService) {
    this.routes$ = this.mapService.routes;
  }
}
