import { User } from "./user.model";

export interface Customer {
    phoneNumber: string;
    isActive: boolean;
    yearsOfSeniority: number;
    userName: string;
    password: string;
    role: number;
  }
  