import { Routes } from '@angular/router';
import { CharacterOverviewComponent } from './home/components/character-overview/character-overview.component';
import { SelectClassComponent } from './home/components/select-class/select-class.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'character', component: CharacterOverviewComponent },
      { path: 'select-class', component: SelectClassComponent },
    ],
  },
];
