import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListViewPageComponent } from './todo-list-view-page.component';
import {  ToastrModule } from 'ngx-toastr';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoListsService } from '../../shared/todo-lists.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommandResult } from '../../../../core/models/command-result.model';
import { of, throwError } from 'rxjs';

describe('TodoListViewPageComponent', () => {
  let component: TodoListViewPageComponent;
  let fixture: ComponentFixture<TodoListViewPageComponent>;
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
      declarations: [TodoListViewPageComponent],
      imports: [HttpClientTestingModule, ToastrModule, RouterTestingModule],
      providers: [TodoListsService, NotificationService, { provide: NotificationService, useValue: mockNotificationService }]
    });
    fixture = TestBed.createComponent(TodoListViewPageComponent);
    const compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);
    notificationService = TestBed.get(NotificationService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should call loadTodoListItem on initialisation', () => {
    spyOn(component, 'loadTodoListItem');
    component.ngOnInit();
    expect(component.loadTodoListItem).toHaveBeenCalled();
  });


  it('should call showSuccess on updateTodoListItem result  isSuccessful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = true;
    result.message = "Update to-do list item successfully";
    let spyC = spyOn(component, 'updateTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'updateTodoListItem').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showSuccess');


    component.updateTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();

  });

  it('should call showErrors on updateTodoListItem result is not successful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Add new to-do list item has error";
    let spyC = spyOn(component, 'updateTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'updateTodoListItem').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showErrors');
    component.updateTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();


  });

  it('should call showError when updateTodoListItem http request fails', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Add new to-do list item has error";
    let spyC = spyOn(component, 'updateTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'updateTodoListItem').and.returnValue(throwError({ status: 404 }));
    let spyN = spyOn(notificationService, 'showError');
    component.updateTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();
  });

  it('should call refresh and  change the pageNumber on markAsDoneTodoListItem result  isSuccessful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = true;
    result.message = "Mark as done successfully";
    let spyC = spyOn(component, 'markAsDoneTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'markAsDone').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showSuccess');
    component.markAsDoneTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();

  });

  it('should call showErrors on markAsDoneTodoListItem result is not successful', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Mark as done has error";
    let spyC = spyOn(component, 'markAsDoneTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'markAsDone').and.returnValue(of(result));
    let spyN = spyOn(notificationService, 'showErrors');
    component.markAsDoneTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();

  });

  it('should call showError when markAsDone http request fails', () => {

    var result = new CommandResult<any>();
    result.isSuccessful = false;
    result.message = "Mark as done has error";
    let spyC = spyOn(component, 'markAsDoneTodoListItem').and.callThrough();
    let spyS = spyOn(service, 'markAsDone').and.returnValue(throwError({ status: 404 }));
    let spyN = spyOn(notificationService, 'showError');
    component.markAsDoneTodoListItem();
    expect(spyC).toHaveBeenCalled();
    expect(spyS).toHaveBeenCalled();
    expect(spyN).toHaveBeenCalled();

  });

});
