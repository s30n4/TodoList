import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { TodoListPendingViewComponent } from './todo-list-pending-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListsService } from '../../../../shared/todo-lists.service';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { CommandResult } from '../../../../../../core/models/command-result.model';


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

  const mockNotificationService = {
    show: (title, message, type) => { },

    showError: (message: string, title?: string) => { },

    showErrors: (messages: string[], title: string) => { },

    showSuccess: (message: string, title?: string) => { }
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListPendingViewComponent],
      imports: [HttpClientTestingModule, ToastrModule],
      providers: [TodoListsService, { provide: NotificationService, useValue: mockNotificationService }]
    });
    fixture = TestBed.createComponent(TodoListPendingViewComponent);

    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);
    notificationService = TestBed.get(NotificationService);

    let todoListItems = new Array<TodoListItem>();
    todoListItems.push(new TodoListItem(), { name: "Todo list item 1", description: "Todo list description 1", completedOn: "", dueDate: "15-04-2021", todoListItemId: "1" });
    todoListItems.push({ name: "Todo list item 2", description: "Todo list description 2", completedOn: "", dueDate: "", todoListItemId: "2" });
    todoListItems.push(new TodoListItem(), { name: "Todo list item 3", description: "Todo list description 3", completedOn: "", dueDate: "15-04-2021", todoListItemId: "3" });


    component.todoListItems = todoListItems;


  });

  it('should call search on initialisation', () => {
    spyOn(component, 'search');
    component.ngOnInit();
    expect(component.search).toHaveBeenCalled();
  });

  it('should call search and  change the pageNumber on onPageChanged ', () => {
    spyOn(component, 'search');
    component.onPageChanged(2);
    expect(component.pageNumber).toBe(2);
    expect(component.search).toHaveBeenCalled();
  });

  it('should call refresh and  change the pageNumber on markAsDoneTodoListItem result  isSuccessful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = true;
    result.message = "Mark as done successfully";
    spyOn(component, 'search');
    let spyC = spyOn(component, 'markAsDoneTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'markAsDone').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showSuccess');
    component.markAsDoneTodoListItem("1");
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
    expect(component.search).toHaveBeenCalled();
    expect(component.pageNumber).toBe(1);
  });

  it('should call showErrors on markAsDoneTodoListItem result is not successful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Mark as done has error";
    spyOn(component, 'search');
    let spyC = spyOn(component, 'markAsDoneTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'markAsDone').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showErrors');
    component.markAsDoneTodoListItem("1");
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
    expect(component.search).not.toHaveBeenCalled();

  });

  it('should call showError when markAsDone http request fails', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Mark as done has error";
    spyOn(component, 'search');
    let spyC = spyOn(component, 'markAsDoneTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'markAsDone').and.returnValue(throwError({ status: 404 }));
    let spyN = spyOn(notificationService, 'showError');
    component.markAsDoneTodoListItem("1");
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
    expect(component.search).not.toHaveBeenCalled();

  });


  it('should call refresh and  change the pageNumber on deleteTodoListItem result  isSuccessful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = true;
    result.message = "delete done successfully";
    spyOn(component, 'search');
    let spyC = spyOn(component, 'deleteTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'removeTodoListItem').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showSuccess');
    component.deleteTodoListItem("1");
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
    expect(component.search).toHaveBeenCalled();
    expect(component.pageNumber).toBe(1);
  });

  it('should call showErrors on deleteTodoListItem result is not successful', () => {

    var result = new CommandResult<any>();
    result.message = "delete done successfully";
    spyOn(component, 'search');
    let spyC = spyOn(component, 'deleteTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'removeTodoListItem').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showErrors');
    component.deleteTodoListItem("1");
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
    expect(component.search).not.toHaveBeenCalled();

  });

  it('should call showError when removeTodoListItem http request fails', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Mark as done has error";
    spyOn(component, 'search');
    let spyC = spyOn(component, 'deleteTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'removeTodoListItem').and.returnValue(throwError({ status: 404 }));
    let spyN = spyOn(notificationService, 'showError');
    component.deleteTodoListItem("1");
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
    expect(component.search).not.toHaveBeenCalled();

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
