import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatDistributionRowComponent } from './stat-distribution-row.component';

describe('StatDistributionRowComponent', () => {
  let component: StatDistributionRowComponent;
  let fixture: ComponentFixture<StatDistributionRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatDistributionRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatDistributionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
