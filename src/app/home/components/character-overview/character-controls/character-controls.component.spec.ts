import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterControlsComponent } from './character-controls.component';

describe('CharacterControlsComponent', () => {
  let component: CharacterControlsComponent;
  let fixture: ComponentFixture<CharacterControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
