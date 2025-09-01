import { Component, Input } from '@angular/core';
import { Skill } from '../../../../../home/models/skill.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-display.component.html',
  styleUrl: './skills-display.component.scss',
})
export class SkillsDisplayComponent {
  @Input() skill!: Skill;
  @Input() index: number | null = 0;

  // ngOnInit() {
  //   // this.skill.nodesSkilled = 23;
  //   console.log(this.index);
  // }

  calculateSkillRank() {
    switch (this.skill.nodesSkilled) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
      case 6:
        return 5;
      case 7:
      case 8:
        return 6;
      case 9:
      case 10:
        return 7;
      case 11:
      case 12:
        return 8;
      case 13:
      case 14:
        return 9;
      case 15:
      case 16:
      case 17:
      case 18:
        return 10;
      case 19:
      case 20:
      case 21:
      case 22:
        return 11;
      case 23:
        return 12;

      default:
        return 0;
    }
  }
}
