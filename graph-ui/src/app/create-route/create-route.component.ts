import { Component, output, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CITIES } from '../map/cities';
import { CargoItem, MapService, Vehicle } from '../map/map.service';

@Component({
  selector: 'app-create-route',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './create-route.component.html',
})
export class CreateRouteComponent {
  routesCreated = output<void>();

  destinationOptions = CITIES.map((c) => c.name);

  constructor(private readonly mapService: MapService) {}

  vehicles: WritableSignal<Vehicle[]> = signal([]);
  items: WritableSignal<CargoItem[]> = signal([]);

  depotForm: FormGroup = new FormGroup({
    name: new FormControl(this.destinationOptions[0], [Validators.required]),
  });

  vehicleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  itemForm: FormGroup = new FormGroup({
    destination: new FormControl(this.destinationOptions[0], Validators.required),
    size: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  createVehicle(): void {
    if (this.vehicleForm.invalid) {
      return;
    }

    const vehicle: Vehicle = {
      name: this.vehicleForm.get('name')!.value,
      capacity: this.vehicleForm.get('capacity')!.value,
    };

    const vehicles = this.vehicles().slice();
    vehicles.push(vehicle);
    this.vehicles.set(vehicles);

    this.vehicleForm.reset({
      name: '',
      size: null,
    });
  }

  removeVehicle(index: number): void {
    const vehicles = this.vehicles();
    vehicles.splice(index, 1);
    this.vehicles.set(vehicles);
  }

  createItem(): void {
    if (this.itemForm.invalid) {
      return;
    }

    const item: CargoItem = {
      destination: this.itemForm.get('destination')!.value,
      size: this.itemForm.get('size')!.value,
    };

    const items = this.items();
    items.push(item);
    this.items.set(items);

    this.itemForm.reset({
      destination: '',
      size: null,
    });
  }

  removeItem(index: number): void {
    const items = this.items();
    items.splice(index, 1);
    this.items.set(items);
  }

  createRoutes(): void {
    const depot = this.depotForm.get('name')!.value;
    const vehicles = this.vehicles();
    const items = this.items();
    this.mapService.loadRoutes(depot, vehicles, items);

    this.routesCreated.emit();
  }

  clearRoutes(): void {
    this.depotForm.get('name')?.setValue(this.destinationOptions[0]);
    this.vehicles.set([]);
    this.items.set([]);

    this.mapService.clearRoutes();
  }
}
