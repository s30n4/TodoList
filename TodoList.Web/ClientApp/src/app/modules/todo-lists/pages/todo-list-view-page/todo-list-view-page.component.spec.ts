import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoItem } from '../../shared/models/todo-item.model';
import { TodoListsService } from '../../shared/todo-lists.service';
import { TodoListViewPageComponent } from './todo-list-view-page.component';

describe('TodoListViewPageComponent', () => {
  let component: TodoListViewPageComponent;
  let fixture: ComponentFixture<TodoListViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListViewPageComponent],
      imports: [ActivatedRoute, NotificationService, TodoItem, TodoListsService]
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
