import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isNumber } from 'util';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable()
export class NgbDateISO8601Adapter extends NgbDateAdapter<string> {
  fromModel(value: string): NgbDateStruct {
    let parsedDate = value ? moment(value) : null;
    if (parsedDate)
      return <NgbDateStruct>{ year: parsedDate.year(), month: parsedDate.month() + 1, day: parsedDate.date() };
    else
      return null;
  }

  toModel(date: NgbDateStruct | null): string {
    if (date) {
      let formattedDate = date.year + '-' + this.padNumber(date.month) + '-' + this.padNumber(date.day);
      return moment(formattedDate).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
    } else
      return null;
  }

  padNumber(value: number) {
    if (isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }
}
