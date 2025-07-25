import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReciveDmgComponent } from '../recive-dmg/recive-dmg.component';
import { HourlyRestComponentComponent } from '../hourly-rest/hourly-rest.component';
import { CustomWeaponCreatorComponent } from '../custom-weapon-creator/custom-weapon-creator.component';
import { CustomWeapon } from '../../models/custom-weapon.model';

@Component({
  selector: 'app-overlay-base',
  standalone: true,
  imports: [
    ReciveDmgComponent,
    HourlyRestComponentComponent,
    CustomWeaponCreatorComponent,
  ],
  templateUrl: './overlay-base.component.html',
  styleUrl: './overlay-base.component.scss',
})
export class OverlayBaseComponent {
  @Output() closeOverlayEvent = new EventEmitter();

  @Input() slectedCustomWeapon: CustomWeapon | null = null;

  ngOnInit() {
    console.log('overlay-base', this.slectedCustomWeapon);
  }

  closeOverlay() {
    this.closeOverlayEvent.emit();
  }
}
