import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FirebaseService } from '../../../services/firebase.service';
import { ICar } from '../../../interfaces/car.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ICarRoute } from '../../../interfaces/carRoute.interface';
import { ICarAndRoutesForTable } from '../../../interfaces/carAndRoutesForTable.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, MatButtonModule, MatTableModule, MatIconModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '0' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomePageComponent implements OnInit {
  columnNames: { [key: string]: string } = {
    'licensePlate': 'License Plate',
    'type': 'Type',
    'fuelConsumption': 'Fuel Consumption'
  }
  columnsToDisplay: string[] = ['licensePlate', 'type', 'fuelConsumption']
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expanded']
  expandedElement?: ICarRoute | null;
  cars?: ICar[];
  carControl: FormControl = new FormControl();
  selectedCar?: ICar;
  dataSource: any;


  totalKilometers = 0;
  totalFuelConsumption = 0;

  constructor(private firebaseService: FirebaseService, private spinnerService: SpinnerService) { }

  async ngOnInit() {
    this.spinnerService.show();

    const cars = await this.firebaseService.getCars();
    this.cars = cars;
    const routes = await this.firebaseService.getRoutes();

    const carsWithRoutes: ICarAndRoutesForTable[] = cars.map(car => ({
      ...car,
      routes: routes.filter(route => route.carId === car.id).map(route => ({
        ...route,
        date: route.date.toDate()
      }))
    }));

    carsWithRoutes.forEach(car => {
      let carKilometers = 0;
      car.routes.forEach(route => {
        carKilometers += Number(route.kilometersTraveled);
      });
      this.totalFuelConsumption += (car.fuelConsumption * carKilometers) / 100;
      this.totalKilometers += carKilometers;
    });

    this.carControl.valueChanges.subscribe(selectedCarId => {
      if (selectedCarId === 'none') {
        this.dataSource = carsWithRoutes;
      } else {
        this.dataSource = carsWithRoutes.filter(car => car.id === selectedCarId);
      }
    });

    this.dataSource = carsWithRoutes;
    this.spinnerService.hide();

  }
}

