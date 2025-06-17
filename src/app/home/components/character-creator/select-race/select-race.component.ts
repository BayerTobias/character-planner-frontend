import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CharRace } from '../../../models/char-race.model';
import { GameDataService } from '../../../../shared/services/game-data.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-race',
  standalone: true,
  imports: [NavigationComponent, CommonModule],
  templateUrl: './select-race.component.html',
  styleUrl: './select-race.component.scss',
})
export class SelectRaceComponent {
  public gameDataService = inject(GameDataService);

  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  public selectedRace: CharRace | null = null;
  public nextClicked: boolean = false;
  public scrolledToBottom: boolean = false;

  @Output() backToSelectClass = new EventEmitter<void>();

  selectRace(race: CharRace) {
    if (this.selectedRace?.name === race.name) {
      this.selectedRace = null;
      return;
    } else {
      this.selectedRace = race;

      setTimeout(() => {
        const element = this.scrollContainers.find((ref) =>
          ref.nativeElement.classList.contains('open')
        )?.nativeElement;

        this.handleScroll(element);
      }, 251);
    }
  }

  handleScroll(container: HTMLElement) {
    if (this.checkIfContainerEnd(container)) this.scrolledToBottom = true;
    else this.scrolledToBottom = false;
  }

  checkIfContainerEnd(container: HTMLElement) {
    const atBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 1;

    return atBottom;
  }
}
