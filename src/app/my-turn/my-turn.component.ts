import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../model/turn.model';
import { UserService } from '../../services/user.service';
import { AddTurnComponent } from '../add-turn/add-turn.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-turn',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    AddTurnComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './my-turn.component.html',
  styleUrls: ['./my-turn.component.css']
})
export class MyTurnComponent implements OnInit {
  turnService: TurnService = inject(TurnService);
  turns: Turn[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log("my-turn login");
    this.loadTurns();
  }

  loadTurns() {
    this.turnService.getTurnsByUser().subscribe({
      next: data => this.turns = data,
      error: err => console.error(err)
    });
  }

  cancelTurn(turnId: number) {
    if (confirm("אתה בטוח שברצונך לבטל את התור?")) {
      this.turnService.removeCustomerFromTurn(turnId).subscribe({
        next: () => {
          // רענון הרשימה כדי לראות את השינויים
          this.loadTurns();
        },
        error: err => console.error(err)
      });
    }
  }
  
  
}
