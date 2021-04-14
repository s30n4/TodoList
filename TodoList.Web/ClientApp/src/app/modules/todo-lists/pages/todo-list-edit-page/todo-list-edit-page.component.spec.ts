import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListEditPageComponent } from './todo-list-edit-page.component';

describe('TodoListEditPageComponent', () => {
  let component: TodoListEditPageComponent;
  let fixture: ComponentFixture<TodoListEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
