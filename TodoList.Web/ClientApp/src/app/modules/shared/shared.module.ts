import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowingRecordNumberComponent } from './showing-record-number/showing-record-number.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { InputDateComponent } from './input-date/input-date.component';
import { NgbDateParserFormatter, NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateISO8601Adapter } from './helpers/ngb-date-iso8601-adapter';
import { MomentDateFormatter } from './helpers/moment-date-formatter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgSelectModule,
    NgxPaginationModule,
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
    ShowingRecordNumberComponent,
    NgxPaginationModule,
    SpinnerComponent,
    ToastrModule,
    NgbModule,
    InputDateComponent
  ],
  declarations: [

    LayoutFooterComponent,
    LayoutHeaderComponent,
    LayoutMainComponent,
    ShowingRecordNumberComponent,
    SpinnerComponent,
    InputDateComponent
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateISO8601Adapter },
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter }
  ]
})
export class SharedModule { }
