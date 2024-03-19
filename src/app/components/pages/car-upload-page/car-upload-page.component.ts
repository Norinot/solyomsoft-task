import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseService } from '../../../services/firebase.service';
import { SpinnerService } from '../../../services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-upload-page',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './car-upload-page.component.html',
  styleUrl: './car-upload-page.component.scss'
})
export class CarUploadPageComponent {
  carUploadForm: FormGroup;
  isLoading = false;

  constructor(fb: FormBuilder, private firebaseService: FirebaseService, private spinnerService: SpinnerService, private router: Router) {
    this.carUploadForm = fb.group({
      licensePlate: ['', Validators.required],
      type: ['', Validators.required],
      fuelConsumption: ['',  [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
   }

   get licensePlate (): FormControl {
    return this.carUploadForm.get('licensePlate') as FormControl;
   }
   get type (): FormControl {
    return this.carUploadForm.get('type') as FormControl;
   }
    get fuelConsumption (): FormControl {
      return this.carUploadForm.get('fuelConsumption') as FormControl;
    }

  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? 'A mező nem lehet üres' : '';
  }

  ngOnInit(): void {}

  uploadCar() {
    if (this.carUploadForm.invalid) {
      return;
    }
    this.spinnerService.show();
    this.firebaseService.uploadCar(this.licensePlate.value, this.type.value, this.fuelConsumption.value)
      .then(() => {
        this.spinnerService.hide();
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.spinnerService.hide();
        console.error('Error uploading car: ', error);
      });
  }
}
