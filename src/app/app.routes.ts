import { Routes } from '@angular/router';
import { CharacterOverviewComponent } from './home/components/character-overview/character-overview.component';
import { SelectClassComponent } from './home/components/select-class/select-class.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  { path: 'character', component: CharacterOverviewComponent },
  { path: 'select-class', component: SelectClassComponent },
];
