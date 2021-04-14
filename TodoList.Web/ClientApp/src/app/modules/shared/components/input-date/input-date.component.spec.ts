import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractValueAccessor } from '@app/core/abstracts/abstract-value-accessor';
import * as moment from 'moment';
import { InputDateComponent } from './input-date.component';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateComponent],
      imports: [  AbstractValueAccessor,  moment]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
