import { Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser = signal<User | null>(null)
  constructor(private http: HttpClient) { }


  setLogin(UserName: string, password: string): Observable<User> {
    return this.http.post<User>('https://localhost:7193/api/auth', {
      UserName,
      password
    });

  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`https://localhost:7193/api/users/${userId}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }
  
  register(customer: Customer) {
    return this.http.post<Customer>('https://localhost:7193/api/customers', customer);
  }
  
}
