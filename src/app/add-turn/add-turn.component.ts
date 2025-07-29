import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnService } from '../../services/turn.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-turn',
  templateUrl: './add-turn.component.html',
  styleUrls: ['./add-turn.component.css'],
  imports:[ReactiveFormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatIconModule]
})
export class AddTurnComponent {
  @Output() turnAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @Input() sellerId!: number;
  turnForm: FormGroup;

  constructor(private fb: FormBuilder, private turnService: TurnService) {
    this.turnForm = this.fb.group({
      day: ['', Validators.required],
      hour: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.sellerId) {
      alert('שגיאה: מזהה מוכר לא זמין, נא לנסות מאוחר יותר');
      return;
    }
    if (this.turnForm.valid) {
      const dataToSend = {
        ...this.turnForm.value,
        sellerId: this.sellerId,
        customerId: null
      };

      this.turnService.addTurn(dataToSend).subscribe({
        next: () => {
          alert('התור נוסף בהצלחה');
          this.turnForm.reset();
          this.turnAdded.emit();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
