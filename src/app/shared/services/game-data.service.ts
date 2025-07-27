import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CharClassListItem,
  CharClassListItemData,
} from '../../home/models/char-class-list-item.mode';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
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

  constructor() {
    this.getClassesList();
    this.getRaceList();
    this.getBaseArmorsList();
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

  async getBaseArmorsList() {
    const url = environment.baseUrl + 'api/base-armors';
    const resp = await lastValueFrom(this.http.get<BaseArmorData[]>(url));

    this.baseArmors = resp.map(
      (baseArmorData: BaseArmorData) => new BaseArmor(baseArmorData)
    );

    console.log(this.baseArmors);
  }

  async getBaseWeaponsList() {
    const url = environment.baseUrl + 'api/base-weapons';
    const resp = await lastValueFrom(this.http.get<BaseWeaponData[]>(url));

    this.baseWeapons = resp.map(
      (baseWeaponData: BaseWeaponData) => new BaseWeapon(baseWeaponData)
    );

    console.log(this.baseWeapons);
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
