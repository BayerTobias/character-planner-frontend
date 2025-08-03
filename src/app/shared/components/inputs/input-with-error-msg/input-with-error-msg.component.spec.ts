import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithErrorMsgComponent } from './input-with-error-msg.component';

describe('InputWithErrorMsgComponent', () => {
  let component: InputWithErrorMsgComponent;
  let fixture: ComponentFixture<InputWithErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputWithErrorMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWithErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
