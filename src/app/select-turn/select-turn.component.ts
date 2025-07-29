import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../model/turn.model';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select-turn',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './select-turn.component.html',
  styleUrl: './select-turn.component.css'
})
export class SelectTurnComponent implements OnInit {
  turnService: TurnService = inject(TurnService);
  turns: Turn[] = [];

  ngOnInit(): void {
    this.turnService.getEmptyTurn().subscribe({
      next: data => this.turns = data,
      error: err => console.error(err)
    });
  }

  selectTurn(id: string) {
    this.turnService.selectTurn(id).subscribe({
      next: res => {
        console.log('Selected:', res);
        // רענון הרשימה אחרי הבחירה
        this.turnService.getEmptyTurn().subscribe({
          next: data => this.turns = data,
          error: err => console.error('Error refreshing list:', err)
        });
      },
      error: err => console.error(err)
    });
  }
  
}
