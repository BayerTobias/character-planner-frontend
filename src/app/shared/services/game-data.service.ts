import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CharClassListItem,
  CharClassListItemData,
} from '../../home/models/char-class-list-item.mode';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { CharRace, CharRaceData } from '../../home/models/char-race.model';
import { BaseWeapon } from '../../home/models/base-weapon.model';
import {
  WeaponGroup,
  WeaponGroupData,
} from '../../home/models/weapon-group.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private http = inject(HttpClient);

  public charClasses: CharClassListItem[] = [];
  public charRaces: CharRace[] = [];
  public baseWeapons: BaseWeapon[] = [
    new BaseWeapon({
      id: 1,
      name: 'waffe1',
      weapon_group: [{ id: 1, name: 'as' }],
      min_str: 5,
      dmg: 1,
      attribute: 'GE',
      weight: 0.5,
      ini_bonus: 1,
    }),

    new BaseWeapon({
      id: 1,
      name: 'waffe2',
      weapon_group: [{ id: 2, name: 'asd123' }],
      min_str: 7,
      dmg: 1,
      attribute: 'ST',
      weight: 1.5,
      ini_bonus: 1,
    }),
  ];
  public weaponGroups: WeaponGroup[] = [];

  constructor() {
    this.getClassesList();
    this.getRaceList();
    this.getBaseWeaponsList();
    this.getWeaponGroupsList();
  }

  async getClassesList() {
    const url = environment.baseUrl + 'api/classes/';
    const resp = await lastValueFrom(
      this.http.get<CharClassListItemData[]>(url)
    );
    this.charClasses = resp.map(
      (classData: CharClassListItemData) => new CharClassListItem(classData)
    );

    console.log(this.charClasses);
  }

  async getRaceList() {
    const url = environment.baseUrl + 'api/races';
    const resp = await lastValueFrom(this.http.get<CharRaceData[]>(url));
    this.charRaces = resp.map(
      (raceData: CharRaceData) => new CharRace(raceData)
    );

    console.log(this.charRaces);
  }

  async getBaseWeaponsList() {
    console.log('getBaseWeaponsList implementieren !!!!');
  }

  async getWeaponGroupsList() {
    const url = environment.baseUrl + 'api/weapon-groups';
    const resp = await lastValueFrom(this.http.get<WeaponGroupData[]>(url));

    this.weaponGroups = resp.map(
      (weaponGroupData: WeaponGroupData) => new WeaponGroup(weaponGroupData)
    );

    console.log(this.weaponGroups);
  }
}
