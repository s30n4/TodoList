import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListPendingViewComponent } from './todo-list-pending-view.component';

describe('TodoListPendingViewComponent', () => {
  let component: TodoListPendingViewComponent;
  let fixture: ComponentFixture<TodoListPendingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListPendingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListPendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
