import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharClassListItem } from '../../home/models/char-class-list-item.mode';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private http = inject(HttpClient);

  public charClasses: CharClassListItem[] = [];

  constructor() {
    this.getClassesList();
  }

  async getClassesList() {
    const url = environment.baseUrl + 'api/classes/';
    const resp = await lastValueFrom(this.http.get<[]>(url));

    const charClasses: CharClassListItem[] = [];

    resp.forEach((charClassData) => {
      const object = new CharClassListItem(charClassData);
      charClasses.push(object);
    });

    this.charClasses = charClasses;
    console.log(this.charClasses);
  }
}
