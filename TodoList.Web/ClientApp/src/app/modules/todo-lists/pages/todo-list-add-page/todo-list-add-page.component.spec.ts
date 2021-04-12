import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListAddPageComponent } from './todo-list-add-page.component';

describe('TodoListAddPageComponent', () => {
  let component: TodoListAddPageComponent;
  let fixture: ComponentFixture<TodoListAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
