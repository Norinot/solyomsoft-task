import { ILocation } from "./location.interface";

export interface ICarRoute {
  carId: string;
  date: any;
  startLocation: ILocation;
  endLocation: ILocation;
  customerLocation: ILocation;
  kilometersTraveled: number;
}
