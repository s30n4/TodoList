import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { InputDateComponent } from './components/input-date/input-date.component';
import { NgbDateParserFormatter, NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateISO8601Adapter } from './helpers/ngb-date-iso8601-adapter';
import { MomentDateFormatter } from './helpers/moment-date-formatter';
import { LayoutNavBreadcrumbsComponent } from './components/layout-nav-breadcrumbs/layout-nav-breadcrumbs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    SweetAlert2Module,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      enableHtml : true
    }),
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    LayoutMainComponent,
    SpinnerComponent,
    ToastrModule,
    NgbModule,
    InputDateComponent,
    LayoutNavBreadcrumbsComponent,
    PaginationComponent,
    TooltipDirective,
    SweetAlert2Module
  ],
  declarations: [

    LayoutMainComponent,
    SpinnerComponent,
    InputDateComponent,
    LayoutNavBreadcrumbsComponent,
    PaginationComponent,
    TooltipDirective
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateISO8601Adapter },
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter }
  ]
})
export class SharedModule { }
