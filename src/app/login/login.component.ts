import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,    
    FormsModule,     
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule       ]
})

export class LoginComponent {
  userName = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private userService: UserService) { }

  onLogin() {
    this.userService.setLogin(this.userName, this.password).subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/register'], { queryParams: { userName: this.userName } });
        } else {
          this.errorMsg = '';
          localStorage.setItem("token", user.token);
          this.userService.selectedUser.set(user);
  
          if (user.userRole === 'seller') {
            this.router.navigate(['/seller-turns']);
          } else if (user.userRole === 'customer') {
            this.router.navigate(['/my-turn']);
          } else {
            this.router.navigate(['/login']); 
          }
  
          alert('התחברת בהצלחה!');
        }
      },
      error: (err) => {
        this.router.navigate(['/register'], { queryParams: { userName: this.userName } });
        console.log("my err", err);
      }
    });
  }
  
}
