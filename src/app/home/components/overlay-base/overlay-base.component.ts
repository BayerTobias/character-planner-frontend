import { Component, EventEmitter, Output } from '@angular/core';
import { ReciveDmgComponent } from '../recive-dmg/recive-dmg.component';

@Component({
  selector: 'app-overlay-base',
  standalone: true,
  imports: [ReciveDmgComponent],
  templateUrl: './overlay-base.component.html',
  styleUrl: './overlay-base.component.scss',
})
export class OverlayBaseComponent {
  @Output() closeOverlayEvent = new EventEmitter();

  closeOverlay() {
    this.closeOverlayEvent.emit();
  }
}
