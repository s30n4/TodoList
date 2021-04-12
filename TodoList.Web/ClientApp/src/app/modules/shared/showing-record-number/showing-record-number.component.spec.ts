import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingRecordNumberComponent } from './showing-record-number.component';

describe('ShowingRecordNumberComponent', () => {
  let component: ShowingRecordNumberComponent;
  let fixture: ComponentFixture<ShowingRecordNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingRecordNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingRecordNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
