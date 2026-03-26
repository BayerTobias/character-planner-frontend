import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponInventoryComponent } from './weapon-inventory.component';

describe('WeaponInventoryComponent', () => {
  let component: WeaponInventoryComponent;
  let fixture: ComponentFixture<WeaponInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
