import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayBaseComponent } from './overlay-base.component';

describe('OverlayBaseComponent', () => {
  let component: OverlayBaseComponent;
  let fixture: ComponentFixture<OverlayBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
