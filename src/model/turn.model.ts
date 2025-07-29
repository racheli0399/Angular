import { Customer } from "./customer.model";
import { Seller } from "./seller.model";

export interface Turn {
  id:number;
    day: string;
    hour: string;
    sellerId: number;
    customerId?: number;
    customer:Customer;
    seller:Seller;
  }
  