import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDoneViewComponent } from './todo-list-done-view.component';

describe('TodoListDoneViewComponent', () => {
  let component: TodoListDoneViewComponent;
  let fixture: ComponentFixture<TodoListDoneViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListDoneViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListDoneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
