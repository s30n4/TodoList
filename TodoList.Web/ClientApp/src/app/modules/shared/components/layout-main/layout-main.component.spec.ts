import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PageTitleService } from '../../../../core/services/page-title.service';
import validator from 'validator';
import { LayoutMainComponent } from './layout-main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutMainComponent', () => {
  let component: LayoutMainComponent;
  let fixture: ComponentFixture<LayoutMainComponent>;
  class MockRouter {
    public ne = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
    public events = new Observable(observer => {
      observer.next(this.ne);
      observer.complete();
    });
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutMainComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: NavigationEnd, useValue: MockRouter }]

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
