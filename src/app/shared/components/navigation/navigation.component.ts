import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Input() color: string | null = null;
  @Input() nextText: string = 'Weiter';
  @Input() backText: string = 'Zurück';

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  emitBack() {
    this.back.emit();
    console.log('back');
  }

  emitNext() {
    this.next.emit();
    console.log('next');
  }
}
