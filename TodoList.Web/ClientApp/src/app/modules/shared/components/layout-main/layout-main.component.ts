import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';
import { filter } from 'rxjs/operators';
import { PageTitleService } from '../../../../core/services/page-title.service';
import validator from 'validator';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit {
  public applicationName = "To-do list"
  public pageTitle: string;
  public breadcrumbItems: BreadcrumbItem[] = [];
  constructor(private pageTitleService: PageTitleService,
    private router: Router) { }

  ngOnInit(): void {
    this.displayPageTitle();
    this.displayBreadcrumbs(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.displayPageTitle();
        this.displayBreadcrumbs(this.router.url);
      });
  }

  private displayPageTitle() {
    this.pageTitle = this.pageTitleService.title; 
  }

  private displayBreadcrumbs(url: string) {
    this.breadcrumbItems = [];
    let tmpUrl: string = '';

   
    url = decodeURI(url);

    for (let index = 1; index < url.split('/').length; index++) {
      let title = url.split('/')[index];


      if (title.includes("?")) {
        let titleParts = title.split('?');
        title = titleParts[0];
      }
      else {
        tmpUrl += '/' + url.split('/')[index];
      }

      if (!validator.isUUID(title)) {
        while (title.indexOf('-') != -1) {
          title = title.replace('-', ' ');
        }
      }

      if (!validator.isUUID(title)) {
        let item = new BreadcrumbItem();
        item.title = title;
        item.url = tmpUrl;

        this.breadcrumbItems.push(item);

      }
    }
  }

}
