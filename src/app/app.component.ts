import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseCharacter } from './home/models/base-character.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'character_planer';

  caracterData = {
    name: 'Milhaus Manasturm',
    race: 'gnome',
    class: 'mage',
    maxHealth: 35,

    strengthValue: 5,
    agilityValue: 5,
    constitutionValue: 6,
    intelligenceValue: 9,
    charismaValue: 6,
  };

  character = new BaseCharacter(this.caracterData);

  createCharacter() {
    console.log(this.character);
  }
}
