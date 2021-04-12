import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable()
export class MomentDateFormatter extends NgbDateParserFormatter {

  readonly DT_FORMAT = 'DD-MMM-YYYY';

  public parse(value: string): NgbDateStruct {
    var input = moment(value.trim());
    if (moment.isMoment(input)) {
      let ngbDateStruct = {
        day: input.date(),
        month: Number.isSafeInteger(input.month()) ? input.month() + 1 : parseInt(moment().month(input.month()).format("M")),
        year: input.year()
      };
      return ngbDateStruct;
    }
    return null;
  }

  public format(date: NgbDateStruct | null): string {
    if (!date)
      return '';

    let mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid())
      return '';

    return mdt.format(this.DT_FORMAT);
  }
}
