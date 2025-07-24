import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWeaponCreatorComponent } from './custom-weapon-creator.component';

describe('CustomWeaponCreatorComponent', () => {
  let component: CustomWeaponCreatorComponent;
  let fixture: ComponentFixture<CustomWeaponCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomWeaponCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomWeaponCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
