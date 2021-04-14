import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListDoneViewComponent } from './components/todo-list-done-view/todo-list-done-view.component';

import { TodoListsPageComponent } from './todo-lists-page.component';

describe('TodoListsPageComponent', () => {
  let component: TodoListsPageComponent;
  let fixture: ComponentFixture<TodoListsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListsPageComponent],
      imports: [TodoListDoneViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
