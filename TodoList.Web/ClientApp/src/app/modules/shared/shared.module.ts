import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    LayoutFooterComponent,
    LayoutHeaderComponent,
    LayoutMainComponent
  ],
  declarations: [

    LayoutFooterComponent,
    LayoutHeaderComponent,
    LayoutMainComponent
  ],
  providers: [

  ]
})
export class SharedModule { }
