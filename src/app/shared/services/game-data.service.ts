import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CharClassListItem,
  CharClassListItemData,
} from '../../home/models/char-class-list-item.mode';
import { environment } from '../../../environments/environment';
import { CharRace, CharRaceData } from '../../home/models/char-race.model';
import {
  BaseWeapon,
  BaseWeaponData,
} from '../../home/models/base-weapon.model';
import {
  WeaponGroup,
  WeaponGroupData,
} from '../../home/models/weapon-group.model';
import { BaseArmor, BaseArmorData } from '../../home/models/base-armor.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private http = inject(HttpClient);

  public charClasses: CharClassListItem[] = [];
  public charRaces: CharRace[] = [];
  public baseArmors: BaseArmor[] = [];
  public baseWeapons: BaseWeapon[] = [];
  public weaponGroups: WeaponGroup[] = [];

  private initialized = false;

  constructor() {}

  loadAll() {
    if (this.initialized) return;

    console.log('LoadAll');
    this.getClassesList();
    this.getRaceList();
    this.getBaseArmorsList();
    this.getBaseWeaponsList();
    this.getWeaponGroupsList();
    this.initialized = true;
  }

  async getClassesList() {
    const url = environment.baseUrl + 'api/classes/';

    this.http.get<CharClassListItemData[]>(url).subscribe({
      next: (resp) => {
        this.charClasses = resp.map(
          (data: CharClassListItemData) => new CharClassListItem(data),
        );
        console.log(this.charClasses);
      },
      error: (err) => {
        console.error('Error loading classes', err);
      },
    });
  }

  async getRaceList() {
    const url = environment.baseUrl + 'api/races';

    this.http.get<CharRaceData[]>(url).subscribe({
      next: (resp) => {
        this.charRaces = resp.map((data: CharRaceData) => new CharRace(data));
        console.log(this.charRaces);
      },
      error: (err) => {
        console.error('Error loading races', err);
      },
    });
  }

  async getBaseArmorsList() {
    const url = environment.baseUrl + 'api/base-armors';

    this.http.get<BaseArmorData[]>(url).subscribe({
      next: (resp) => {
        this.baseArmors = resp.map(
          (data: BaseArmorData) => new BaseArmor(data),
        );
        console.log(this.baseArmors);
      },
      error: (err) => {
        console.error('Error loading base armors', err);
      },
    });
  }

  async getBaseWeaponsList() {
    const url = environment.baseUrl + 'api/base-weapons';

    this.http.get<BaseWeaponData[]>(url).subscribe({
      next: (resp) => {
        this.baseWeapons = resp.map(
          (data: BaseWeaponData) => new BaseWeapon(data),
        );
        console.log(this.baseWeapons);
      },
      error: (err) => {
        console.error('Error loading base weapons', err);
      },
    });
  }

  async getWeaponGroupsList() {
    const url = environment.baseUrl + 'api/weapon-groups';

    this.http.get<WeaponGroupData[]>(url).subscribe({
      next: (resp) => {
        this.weaponGroups = resp.map(
          (data: WeaponGroupData) => new WeaponGroup(data),
        );
        console.log(this.weaponGroups);
      },
      error: (err) => {
        console.error('Error loading weapon groups', err);
      },
    });
  }
}
