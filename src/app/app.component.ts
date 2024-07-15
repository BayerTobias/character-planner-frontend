import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseCharacter } from './home/models/base-character.model';
import { Mage } from './home/models/mage-character.model';
import { Skill, SkillData } from './home/models/skill.model';

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
    level: 7,

    skills: [
      new Skill({
        name: 'asd',
        description: 'desc',
        level: 0,
        firstLevelCost: 1,
        secondLevelCost: 2,
      }),
      new Skill({
        name: 'Develop Magic',
        description: 'Allows the mage to develop magical abilities.',
        level: 0,
        firstLevelCost: 1,
        secondLevelCost: 5,
      }),
    ],

    strengthValue: 5,
    agilityValue: 5,
    constitutionValue: 6,
    intelligenceValue: 9,
    charismaValue: 6,
  };

  character = new Mage(this.caracterData);

  createCharacter() {
    console.log(this.character);
  }
}
