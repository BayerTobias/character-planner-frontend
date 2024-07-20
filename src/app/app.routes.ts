import { Routes } from '@angular/router';
import { CharacterOverviewComponent } from './home/components/character-overview/character-overview.component';
import { SelectClassComponent } from './home/components/select-class/select-class.component';

export const routes: Routes = [
  { path: 'character', component: CharacterOverviewComponent },
  { path: 'select-class', component: SelectClassComponent },
];
