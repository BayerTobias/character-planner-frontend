import { Routes } from '@angular/router';
import { CharacterOverviewComponent } from './home/components/character-overview/character-overview.component';
import { SelectClassComponent } from './home/components/select-class/select-class.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { authGuard } from './auth/guards/auth.guard';
import { CharacterSelectionComponent } from './home/components/character-selection/character-selection.component';
import { CharacterCreatorComponent } from './home/components/character-creator/character-creator.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'create-character', component: CharacterCreatorComponent },
      { path: 'select-character', component: CharacterSelectionComponent },
      { path: 'character', component: CharacterOverviewComponent },
      { path: 'select-class', component: SelectClassComponent },
    ],
  },
];
