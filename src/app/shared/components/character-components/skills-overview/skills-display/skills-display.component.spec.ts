import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDisplayComponent } from './skills-display.component';

describe('SkillsDisplayComponent', () => {
  let component: SkillsDisplayComponent;
  let fixture: ComponentFixture<SkillsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
