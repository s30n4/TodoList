import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { MockTodoListsService } from '../../../../shared/mock-todo-lists.service';
import { TodoListPendingViewComponent } from './todo-list-pending-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TodoListsService } from '../../../../shared/todo-lists.service';
import { MockNotificationService } from '../../../../../../core/services/mock-notification.service';


fdescribe('TodoListPendingViewComponent', () => {
  let component: TodoListPendingViewComponent;
  let fixture: ComponentFixture<TodoListPendingViewComponent>;
  let service: TodoListsService;
  let notificationService: NotificationService;
  let getPendingTodoListItems: jasmine.Spy;
  let markAsDone: jasmine.Spy;
  let removeTodoListItem: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListPendingViewComponent],

      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        HttpClientTestingModule],
      providers: [
        { provides: TodoListsService, useClass: MockTodoListsService },
        { provides: NotificationService, useClass: MockNotificationService }

      ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListPendingViewComponent);
    service = TestBed.inject(TodoListsService);
    notificationService = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call "search()" when "search()" is called', () => {
    component.search();
    expect(getPendingTodoListItems).toHaveBeenCalled();
  });

  it('should call "deleteTodoListItem()" when "deleteTodoListItem()" is called', () => {
    component.deleteTodoListItem("1");
    expect(removeTodoListItem).toHaveBeenCalled();
  });

  it('should call "markAsDoneTodoListItem()" when "markAsDoneTodoListItem()" is called', () => {
    component.markAsDoneTodoListItem("1");
    expect(markAsDone).toHaveBeenCalled();
  });

  it('should call todoListItemMarkedAsDone output', () => {
    // Arrange
    const sayTodoListItemMarkedAsDone = spyOn(component.todoListItemMarkedAsDone, 'emit');
    // Act
    component.todoListItemMarkedAsDone.emit("test");
    // Assert
    expect(sayTodoListItemMarkedAsDone).toHaveBeenCalled();
    expect(sayTodoListItemMarkedAsDone).toHaveBeenCalledWith('test');
  });

});
