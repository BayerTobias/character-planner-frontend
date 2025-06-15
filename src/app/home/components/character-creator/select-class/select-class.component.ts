import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../../shared/services/game-data.service';
import { CharClassListItem } from '../../../models/char-class-list-item.mode';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-select-class',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './select-class.component.html',
  styleUrl: './select-class.component.scss',
})
export class SelectClassComponent {
  public gameDataService = inject(GameDataService);

  public selectedClass: CharClassListItem | null = null;

  selectClass(charClass: CharClassListItem) {
    this.selectedClass = charClass;
    console.log(this.selectedClass);
  }

  getGermanName(className: string) {
    switch (className) {
      case 'mage':
        return 'Zauberer';
        break;
      case 'rouge':
        return 'Dieb';
        break;
      case 'warrior':
        return 'Krieger';
        break;
      case 'priest':
        return 'Priester';
        break;
      case 'bard':
        return 'Barde';
        break;
      case 'ranger':
        return 'Waldläufer';
        break;
      case 'shaman':
        return 'Schamane';
        break;
      default:
        return className;
        break;
    }
  }
}
