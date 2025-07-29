import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../model/customer.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatButtonModule,]
})
export class RegisterComponent implements OnInit {
  customer: Customer = {
    userName: '',
    password: '',
    phoneNumber: '',
    yearsOfSeniority: 0,
    isActive: true,
    role: 0
  };
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['userName']) {
        this.customer.userName = params['userName'];
      }
    });
  }

  onRegister() {
    this.userService.register(this.customer).subscribe({
      next: () => {
        this.router.navigate(['/recipes']); // ניווט אחרי הרשמה
      },
      error: err => {
        if (err.status === 409) {
          this.errorMsg = 'המשתמש כבר קיים';
        } else {
          this.errorMsg = 'שגיאה בהרשמה';
        }
      }
    });
  }
}
