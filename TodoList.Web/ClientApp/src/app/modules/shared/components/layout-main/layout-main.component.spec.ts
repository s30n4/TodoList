import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';
import { filter } from 'rxjs/operators';
import { PageTitleService } from '../../../../core/services/page-title.service';
import validator from 'validator';
import { LayoutMainComponent } from './layout-main.component';

describe('LayoutMainComponent', () => {
  let component: LayoutMainComponent;
  let fixture: ComponentFixture<LayoutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutMainComponent],
      imports: [NavigationEnd, Router, BreadcrumbItem, filter, PageTitleService, validator]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
