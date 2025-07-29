import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[RouterOutlet,CommonModule,RouterLink,MatIconModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public user:UserService) {
    
  }

  ngOnInit(): void {

  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}