import { ICar } from "./car.interface";
import { ICarRoute } from "./carRoute.interface";

export interface ICarAndRoutesForTable extends ICar {
  routes: ICarRoute[];
}
