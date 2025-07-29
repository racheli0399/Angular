import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Turn } from '../model/turn.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Seller } from '../model/seller.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(private http: HttpClient, private userService: UserService) { }
  getEmptyTurn() {
    return this.http.get<Turn[]>(`https://localhost:7193/api/turns/empty`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
  cancelTurn(id: number) {
    return this.http.put(`https://localhost:7193/api/turns/cancel/${id}`, {}, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
  
  getTurnsByUser() {
    return this.http.get<Turn[]>(`https://localhost:7193/api/turns/user/${this.userService.selectedUser()?.id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
 getTurnsBySeller() {
    const userId = this.userService.selectedUser()?.id;
    if (!userId) throw new Error("משתמש לא מחובר");

    return new Observable<Turn[]>(observer => {
      this.getSellerByUserId(userId).subscribe({
        next: seller => {
          this.getTurnsBySellerId(+seller.id!).subscribe({
            next: turns => observer.next(turns),
            error: err => observer.error(err),
            complete: () => observer.complete()
          });
        },
        error: err => observer.error(err)
      });
    });
  }

  getTurnsBySellerId(sellerId: number): Observable<Turn[]> {
    return this.http.get<Turn[]>(`https://localhost:7193/api/turns/seller/${sellerId}`, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    });
  }
  
  getSellerByUserId(userId: number): Observable<Seller> {
    return this.http.get<Seller>(`https://localhost:7193/api/sellers/user/${userId}`, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    });
  }
  
  deleteTurn(id: number) {
    return this.http.delete(`https://localhost:7193/api/turns/${id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
  
  addTurn(turn: Turn) {
    console.log(turn);
    return this.http.post<Turn>(`https://localhost:7193/api/turns/`, turn, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
 
  removeCustomerFromTurn(turnId: number): Observable<void> {
    return this.http.put<void>(
      `https://localhost:7193/api/turns/remove-customer/${turnId}`,
      {},
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }
    );
  }
  
  selectTurn(id: string) {
    console.log(this.userService.selectedUser()?.id);
    return this.http.put<Turn[]>(`https://localhost:7193/api/turns/selecct/${id}`, {
      customerId: this.userService.selectedUser()?.id
    }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },

    },
    );
  }
}