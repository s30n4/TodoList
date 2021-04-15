import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoListsService } from '../../shared/todo-lists.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListAddPageComponent } from './todo-list-add-page.component';
import { CommandResult } from '../../../../core/models/command-result.model';
import { of, throwError } from 'rxjs';

describe('TodoListAddPageComponent', () => {

  let component: TodoListAddPageComponent;
  let fixture: ComponentFixture<TodoListAddPageComponent>;
  let service: TodoListsService;
  let notificationService: NotificationService;

  const mockNotificationService = {
    show: (title, message, type) => { },

    showError: (message: string, title?: string) => { },

    showErrors: (messages: string[], title: string) => { },

    showSuccess: (message: string, title?: string) => { }
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListAddPageComponent],
      imports: [HttpClientTestingModule, ToastrModule, RouterTestingModule],
      providers: [TodoListsService, NotificationService, { provide: NotificationService, useValue: mockNotificationService }]
    });
    fixture = TestBed.createComponent(TodoListAddPageComponent);
    const compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);
    notificationService = TestBed.get(NotificationService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should call showSuccess on saveTodoListItem result  isSuccessful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = true;
    result.message = "Add new to-do list item successfully";
    let spyC = spyOn(component, 'saveTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'addTodoListItem').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showSuccess');


    component.saveTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();

  });

  it('should call showErrors on saveTodoListItem result is not successful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Add new to-do list item has error";
    let spyC = spyOn(component, 'saveTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'addTodoListItem').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showErrors');
    component.saveTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();


  });

  it('should call showError when saveTodoListItem http request fails', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Add new to-do list item has error";
    let spyC = spyOn(component, 'saveTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'addTodoListItem').and.returnValue(throwError({ status: 404 }));
    let spyN = spyOn(notificationService, 'showError');
    component.saveTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
  });



});
