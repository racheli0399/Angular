import { User } from "./user.model";

export interface Seller {
    id?: string;
    yearsOfSeniority: number;
    isActive: boolean;
    userName: string;
    password: string;
    user:User;
  }
  