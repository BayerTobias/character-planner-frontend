import { Component, Input } from '@angular/core';
import { Skill } from '../../../../home/models/skill.model';

@Component({
  selector: 'app-skills-display',
  standalone: true,
  imports: [],
  templateUrl: './skills-display.component.html',
  styleUrl: './skills-display.component.scss',
})
export class SkillsDisplayComponent {
  @Input() skill!: Skill;
}
