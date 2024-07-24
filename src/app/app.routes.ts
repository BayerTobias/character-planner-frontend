import { Routes } from '@angular/router';
import { CharacterOverviewComponent } from './home/components/character-overview/character-overview.component';
import { SelectClassComponent } from './home/components/select-class/select-class.component';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'character', component: CharacterOverviewComponent },
  { path: 'select-class', component: SelectClassComponent },
];
