import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, getDoc, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICar } from '../interfaces/car.interface';
import { ICarRoute } from '../interfaces/carRoute.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public firestore: Firestore) { }

  uploadCar(licensePlate: string, type: string, fuelConsumption: string): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'cars'), {
      licensePlate: licensePlate,
      type: type,
      fuelConsumption: fuelConsumption,
    });
  }

  async getCars(): Promise<ICar[]> {
    const aCollection = collection(this.firestore, 'cars');
    const snapshot = await getDocs(aCollection);
    const cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ICar));
    return cars;
  }

  attachRoute(carId: string, date: string, startLocation: string, endLocation: string, customerLocation: string, kilometersTraveled: string): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'routes'), {
      carId: carId,
      date: date,
      startLocation: startLocation,
      endLocation: endLocation,
      customerLocation: customerLocation,
      kilometersTraveled: kilometersTraveled
    });
  }

  async getRoutes(): Promise<ICarRoute[]> {
    const aCollection = collection(this.firestore, 'routes');
    const snapshot = await getDocs(aCollection);
    const routes = snapshot.docs.map(doc => ({ carId: doc.id, ...doc.data() } as ICarRoute));
    return routes;
  }
}
