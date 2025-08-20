import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReciveDmgComponent } from '../recive-dmg/recive-dmg.component';
import { HourlyRestComponentComponent } from '../hourly-rest/hourly-rest.component';
import { CustomWeaponCreatorComponent } from '../item-management/custom-weapon-creator/custom-weapon-creator.component';
import { CustomWeapon } from '../../models/custom-weapon.model';
import { StatDistributionInfoComponent } from '../character-creator/character-details/stat-distribution-info/stat-distribution-info.component';

@Component({
  selector: 'app-overlay-base',
  standalone: true,
  imports: [
    ReciveDmgComponent,
    HourlyRestComponentComponent,
    CustomWeaponCreatorComponent,
    StatDistributionInfoComponent,
  ],
  templateUrl: './overlay-base.component.html',
  styleUrl: './overlay-base.component.scss',
})
export class OverlayBaseComponent {
  @Input() slectedCustomWeapon: CustomWeapon | null = null;

  @Output() closeOverlayEvent = new EventEmitter();

  ngOnInit() {
    console.log('overlay-base', this.slectedCustomWeapon);
  }

  closeOverlay() {
    this.closeOverlayEvent.emit();
  }
}
