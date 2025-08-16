import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classTranslate',
  standalone: true,
})
export class ClassTranslatePipe implements PipeTransform {
  private readonly translations: Record<string, string> = {
    mage: 'Zauberer',
    warrior: 'Krieger',
    rogue: 'Dieb',
    priest: 'Priester',
    bard: 'Barde',
    ranger: 'Waldläufer',
    shaman: 'Schamane',
  };

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return;

    const key = value.toString().toLowerCase().trim();

    return this.translations[key] ?? value;
  }
}
