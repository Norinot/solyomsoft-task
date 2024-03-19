import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICar } from '../../../interfaces/car.interface';
import { FirebaseService } from '../../../services/firebase.service';
import { SpinnerService } from '../../../services/spinner.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attach-route-page',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './attach-route-page.component.html',
  styleUrl: './attach-route-page.component.scss'
})
export class AttachRoutePageComponent {
  routeAttachForm: FormGroup;
  cars!: ICar[];
  constructor(fb: FormBuilder, private firebaseService: FirebaseService, private spinnerService: SpinnerService, private router: Router) {
    this.routeAttachForm = fb.group({
      car: ['', Validators.required],
      date: ['', Validators.required],
      startLocation: fb.group({
        address: fb.group({
          city: ['', Validators.required],
          street: ['', Validators.required],
          number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        }),
        description: ['', Validators.required],
        notMasterData: ['', Validators.required]
      }),
      endLocation: fb.group({
        address: fb.group({
          city: ['', Validators.required],
          street: ['', Validators.required],
          number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        }),
        description: ['', Validators.required],
        notMasterData: ['', Validators.required]
      }),
      customerLocation: fb.group({
        description: ['', Validators.required],
        notMasterData: ['', Validators.required]
      }),
      kilometersTraveled: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit() {
    this.getAllCars();
  }
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? 'A mező nem lehet üres' : '';
  }

  getAllCars() {
    this.firebaseService.getCars().then(cars => {
      this.cars = cars;
    }).catch(error => {
      console.error('Error getting cars: ', error);
    });
  }
  attachRoute() {
    if (this.routeAttachForm.invalid) {
      return;
    }

    this.spinnerService.show();
    const carId = this.routeAttachForm.get('car')?.value;
    const date = this.routeAttachForm.get('date')?.value;
    const startLocation = this.routeAttachForm.get('startLocation')?.value;
    const endLocation = this.routeAttachForm.get('endLocation')?.value;
    const customerLocation = this.routeAttachForm.get('customerLocation')?.value;
    const kilometersTraveled = this.routeAttachForm.get('kilometersTraveled')?.value;

    this.firebaseService.attachRoute(carId, date, startLocation, endLocation, customerLocation, kilometersTraveled)
      .then(() => {
        this.spinnerService.hide();
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.spinnerService.hide();
        console.error('Error attaching route: ', error);
      });
  }

  getControl(path: string): FormControl {
    return this.routeAttachForm.get(path) as FormControl;
  }

}
