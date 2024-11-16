import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveDmgComponent } from './recive-dmg.component';

describe('ReciveDmgComponent', () => {
  let component: ReciveDmgComponent;
  let fixture: ComponentFixture<ReciveDmgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReciveDmgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciveDmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
