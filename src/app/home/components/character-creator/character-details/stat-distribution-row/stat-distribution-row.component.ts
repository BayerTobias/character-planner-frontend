import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stat-distribution-row',
  standalone: true,
  imports: [],
  templateUrl: './stat-distribution-row.component.html',
  styleUrl: './stat-distribution-row.component.scss',
})
export class StatDistributionRowComponent {
  @Input() statName: string = '';
  @Input() statValue: number = 0;
  @Input() statBonus: number = 0;

  @Output() decreaseEvent = new EventEmitter();
  @Output() increaseEvent = new EventEmitter();

  decreaseStat() {
    this.decreaseEvent.emit();
  }

  increaseStat() {
    this.increaseEvent.emit();
  }
}
