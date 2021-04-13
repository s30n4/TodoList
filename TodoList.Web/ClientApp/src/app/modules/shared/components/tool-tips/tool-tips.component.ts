import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-tips',
  templateUrl: './tool-tips.component.html',
  styleUrls: ['./tool-tips.component.scss']
})
export class ToolTipsComponent implements OnInit {
  @Input() public text: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
