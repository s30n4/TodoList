import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showing-record-number',
  templateUrl: './showing-record-number.component.html',
  styleUrls: ['./showing-record-number.component.scss']
})
export class ShowingRecordNumberComponent {
  @Input() public totalCount: number = 0;
  @Input() public pageNumber: number = 1;
  @Input() public pageSize: number = 10;

  get startRange(): number {
    return ((this.pageNumber - 1) * this.pageSize) + 1;
  }

  get endRange(): number {
    const max = this.pageNumber * this.pageSize;

    if (this.totalCount < max)
      return this.totalCount;

    return max;
  }


  constructor() { }

}
