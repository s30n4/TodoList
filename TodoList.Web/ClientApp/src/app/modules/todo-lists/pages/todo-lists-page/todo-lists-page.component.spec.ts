import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsPageComponent } from './todo-lists-page.component';

describe('TodoListsPageComponent', () => {
  let component: TodoListsPageComponent;
  let fixture: ComponentFixture<TodoListsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListsPageComponent ]
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
