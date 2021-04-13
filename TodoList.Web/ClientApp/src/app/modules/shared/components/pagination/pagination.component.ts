import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() public totalCount: number = 0;
  @Input() public pageNumber: number = 1;
  @Input() public pageSize: number = 5;


  @Output() public pageChanged: EventEmitter<number> = new EventEmitter();

  get startRange(): number {
    return ((this.pageNumber - 1) * this.pageSize) + 1;
  }

  get endRange(): number {
    const max = this.pageNumber * this.pageSize;

    if (this.totalCount < max)
      return this.totalCount;

    return max;
  }

  get hasNext(): boolean {
    const max = this.pageNumber * this.pageSize;

    return this.totalCount > max;

  }

  constructor() { }

  ngOnInit(): void {
  }

  previousPageClicked() {
    this.pageNumber = this.pageNumber - 1;
    this.pageChanged.emit(this.pageNumber);
  }

  nextPageClicked() {
    this.pageNumber = this.pageNumber + 1;
    this.pageChanged.emit(this.pageNumber);
  }

}
