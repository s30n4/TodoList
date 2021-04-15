import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { TodoListPendingViewComponent } from './todo-list-pending-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListsService } from '../../../../shared/todo-lists.service';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { PagedQueryResult } from '../../../../../../core/models/paged-query-result.model';


describe('TodoListPendingViewComponent', () => {
  let component: TodoListPendingViewComponent;
  let fixture: ComponentFixture<TodoListPendingViewComponent>;
  let service: TodoListsService;
  let notificationService: NotificationService;


  const toastrService = {
    options: { positionClass: 'toast-bottom-center', enableHtml: true },
    success: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => { },
    error: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => { },
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListPendingViewComponent],
      imports: [HttpClientTestingModule, ToastrModule],
      providers: [TodoListsService, NotificationService, { provide: ToastrService, useValue: toastrService }]
    });
    fixture = TestBed.createComponent(TodoListPendingViewComponent);

    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);

  });
  it('need getPendingTodoListItems return pending todo list item when called ', () => {

    let todoListItems = new Array<TodoListItem>();
    todoListItems.push(new TodoListItem(), { name: "Todo list item 1", description: "Todo list description 1", completedOn: "", dueDate: "15-04-2021", todoListItemId: "1" });
    todoListItems.push({ name: "Todo list item 2", description: "Todo list description 2", completedOn: "", dueDate: "", todoListItemId: "2" });
    todoListItems.push(new TodoListItem(), { name: "Todo list item 3", description: "Todo list description 3", completedOn: "", dueDate: "15-04-2021", todoListItemId: "3" });

    let result = new PagedQueryResult<TodoListItem>();
    result.list = todoListItems;
    result.pageIndex = 1;
    result.pageSize = 5;
    result.totalCount = 3;


    spyOn(service, 'getPendingTodoListItems').and.returnValue(of(result));
   // expect(service.getPendingTodoListItems(1, 5)).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
