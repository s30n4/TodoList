import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutNavBreadcrumbsComponent } from './layout-nav-breadcrumbs.component';

describe('LayoutNavBreadcrumbsComponent', () => {
  let component: LayoutNavBreadcrumbsComponent;
  let fixture: ComponentFixture<LayoutNavBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutNavBreadcrumbsComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutNavBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
