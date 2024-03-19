import { IAddress } from "./address.interface";

export interface ILocation {
  address: IAddress;
  description: string;
  notMasterData: string;
}
