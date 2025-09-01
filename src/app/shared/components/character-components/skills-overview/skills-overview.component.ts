import { Component, Input } from '@angular/core';
import { SkillsDisplayComponent } from './skills-display/skills-display.component';
import { BaseCharacter } from '../../../../home/models/base-character.model';
import { Mage } from '../../../../home/models/mage-character.model';

@Component({
  selector: 'app-skills-overview',
  standalone: true,
  imports: [SkillsDisplayComponent],
  templateUrl: './skills-overview.component.html',
  styleUrl: './skills-overview.component.scss',
})
export class SkillsOverviewComponent {
  @Input() character: BaseCharacter | Mage = new BaseCharacter();

  ngOnInit() {
    console.log('skill overview', this.character);
  }
}
