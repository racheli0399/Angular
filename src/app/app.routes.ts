import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyTurnComponent } from './my-turn/my-turn.component';
import { SelectTurnComponent } from './select-turn/select-turn.component';
import { SellerTurnsComponent } from './seller-turns/seller-turns.component'; // תיצור את זה
import { Routes } from '@angular/router';
import { AddTurnComponent } from './add-turn/add-turn.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // לפאנית
  { path: 'seller-turns', component: SellerTurnsComponent },
  { path: 'add-turn', component: AddTurnComponent }, // אם יש רכיב כזה

  // ללקוחה
  { path: 'my-turn', component: MyTurnComponent },
  { path: 'select-turn', component: SelectTurnComponent },

  { path: '**', redirectTo: 'login' },
];
