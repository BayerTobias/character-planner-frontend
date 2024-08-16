import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-box',
  standalone: true,
  imports: [],
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.scss',
})
export class StatBoxComponent {
  @Input() public strengthValue: number = 0;
  @Input() public strengthBonus: number = 0;
  @Input() public agilityValue: number = 0;
  @Input() public agilityBonus: number = 0;
  @Input() public constitutionValue: number = 0;
  @Input() public constitutionBonus: number = 0;
  @Input() public intelligenceValue: number = 0;
  @Input() public intelligenceBonus: number = 0;
  @Input() public charismaValue: number = 0;
  @Input() public charismaBonus: number = 0;
}
