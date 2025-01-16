import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CreateRouteComponent } from './create-route/create-route.component';
import { RouteDetailsComponent } from './route-details/route-details.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgClass,
    CreateRouteComponent,
    RouteDetailsComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  showRouteInfo: boolean = false;

  onShowRouteInfo(): void {
    this.showRouteInfo = true;
  }

  onHideRouteInfo(): void {
    this.showRouteInfo = false;
  }
}
