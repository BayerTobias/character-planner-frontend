import { Component, Input } from '@angular/core';
import { BaseWeapon } from '../../../models/base-weapon.model';
import { CustomWeapon } from '../../../models/custom-weapon.model';

@Component({
  selector: 'app-weapon-inventory',
  standalone: true,
  imports: [],
  templateUrl: './weapon-inventory.component.html',
  styleUrl: './weapon-inventory.component.scss',
})
export class WeaponInventoryComponent {
  @Input() baseWeapons: BaseWeapon[] = [];
  @Input() customWeapons: CustomWeapon[] = [];
}
