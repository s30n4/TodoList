import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { InputDateComponent } from './components/input-date/input-date.component';
import { NgbDateParserFormatter, NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateISO8601Adapter } from './helpers/ngb-date-iso8601-adapter';
import { MomentDateFormatter } from './helpers/moment-date-formatter';
import { LayoutNavBreadcrumbsComponent } from './components/layout-nav-breadcrumbs/layout-nav-breadcrumbs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToolTipsComponent } from './components/tool-tips/tool-tips.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    LayoutFooterComponent,
    LayoutHeaderComponent,
    LayoutMainComponent,
    SpinnerComponent,
    ToastrModule,
    NgbModule,
    InputDateComponent,
    LayoutNavBreadcrumbsComponent,
    PaginationComponent,
    ToolTipsComponent,
    TooltipDirective
  ],
  declarations: [

    LayoutFooterComponent,
    LayoutHeaderComponent,
    LayoutMainComponent,
    SpinnerComponent,
    InputDateComponent,
    LayoutNavBreadcrumbsComponent,
    PaginationComponent,
    ToolTipsComponent,
    TooltipDirective
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateISO8601Adapter },
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter }
  ]
})
export class SharedModule { }
