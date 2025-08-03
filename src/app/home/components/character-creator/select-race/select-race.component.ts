import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CharRace } from '../../../models/char-race.model';
import { GameDataService } from '../../../../shared/services/game-data.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
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

  @Input() public selectedRace: CharRace | null = null;

  public nextClicked: boolean = false;
  public scrolledToBottom: boolean = false;

  @Output() backToSelectClass = new EventEmitter<void>();
  @Output() raceSelected = new EventEmitter<CharRace>();

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

  validateSelectionAndContinue() {
    this.nextClicked = true;

    if (this.selectedRace) {
      this.raceSelected.emit(this.selectedRace);
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
