import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { AbstractValueAccessor, MakeProvider } from '@app/core/abstracts/abstract-value-accessor';
import * as moment from 'moment';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    MakeProvider(InputDateComponent)
  ]
})

export class InputDateComponent extends AbstractValueAccessor {
  private currentDate = new Date();

  @Input() public id: string = Guid.create().toString();
  @Input() public isRequired = false;
  @Input() public cssClasses: string = "form-control";
  @Input() public btnCssClasses: string = "btn-default";
  @Input() public dateTitle = 'Date';
  @Input() public placeholder: string = 'dd/mm/yyyy';
  @Input() public min: NgbDateStruct = { year: 1900, month: 1, day: 1 };
  @Input() public max: NgbDateStruct = { day: this.currentDate.getUTCDate(), month: this.currentDate.getUTCMonth() + 1, year: this.currentDate.getUTCFullYear() + 30 };
  @Output() public dateValueChanged: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
    super();
  }

  public onDateChanged() {
    if (!moment(this.value).isValid()) {
      this.value = null;
      
    }
    else {
      this.dateValueChanged.emit(this.value);
      
    }
  }
}
