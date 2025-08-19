import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatDistributionInfoComponent } from './stat-distribution-info.component';

describe('StatDistributionInfoComponent', () => {
  let component: StatDistributionInfoComponent;
  let fixture: ComponentFixture<StatDistributionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatDistributionInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatDistributionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
