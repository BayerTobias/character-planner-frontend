import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../../shared/services/game-data.service';
import { CharClassListItem } from '../../../models/char-class-list-item.mode';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-class',
  standalone: true,
  imports: [NavigationComponent, CommonModule],
  templateUrl: './select-class.component.html',
  styleUrl: './select-class.component.scss',
})
export class SelectClassComponent {
  public gameDataService = inject(GameDataService);
  private router = inject(Router);

  public selectedClass: CharClassListItem | null = null;
  public nextClicked: boolean = false;

  selectClass(charClass: CharClassListItem) {
    this.selectedClass = charClass;
  }

  checkIfClassSelected() {
    this.nextClicked = true;
  }

  navigateToPreviousPage() {
    this.router.navigateByUrl('/select-character');
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
