import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListViewPageComponent } from './todo-list-view-page.component';

describe('TodoListViewPageComponent', () => {
  let component: TodoListViewPageComponent;
  let fixture: ComponentFixture<TodoListViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
