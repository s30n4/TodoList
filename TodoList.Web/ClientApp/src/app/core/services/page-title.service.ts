import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private _title: string;
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
}
