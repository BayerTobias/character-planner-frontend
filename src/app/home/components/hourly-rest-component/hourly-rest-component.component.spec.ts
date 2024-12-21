import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyRestComponentComponent } from './hourly-rest-component.component';

describe('HourlyRestComponentComponent', () => {
  let component: HourlyRestComponentComponent;
  let fixture: ComponentFixture<HourlyRestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyRestComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyRestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
