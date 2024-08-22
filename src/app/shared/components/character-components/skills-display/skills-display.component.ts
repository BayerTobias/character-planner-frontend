import { Component, Input } from '@angular/core';
import { Skill } from '../../../../home/models/skill.model';
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
}
