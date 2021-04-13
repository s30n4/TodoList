import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';

@Component({
  selector: 'app-layout-nav-breadcrumbs',
  templateUrl: './layout-nav-breadcrumbs.component.html',
  styleUrls: ['./layout-nav-breadcrumbs.component.scss']
})
export class LayoutNavBreadcrumbsComponent {

  constructor() { }

  @Input() public breadcrumbs: BreadcrumbItem[] = [];

}
