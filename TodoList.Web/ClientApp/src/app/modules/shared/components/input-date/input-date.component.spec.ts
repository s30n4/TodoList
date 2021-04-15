import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractValueAccessor } from '@app/core/abstracts/abstract-value-accessor';
import { InputDateComponent } from './input-date.component';
import { ControlValueAccessor } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  let controlValueAccess: ControlValueAccessor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputDateComponent],
      imports: [NgbModule],
      providers: [{ provide: AbstractValueAccessor, useValue: controlValueAccess }],
    });
    fixture = TestBed.createComponent(InputDateComponent);

    component = fixture.componentInstance;
 


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
