import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoListsService } from '../../shared/todo-lists.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListAddPageComponent } from './todo-list-add-page.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TodoItem } from '../../shared/models/todo-item.model';

fdescribe('TodoListAddPageComponent', () => {

  let component: TodoListAddPageComponent;
  let fixture: ComponentFixture<TodoListAddPageComponent>;
  let service: TodoListsService;
  let notificationService: NotificationService;

  let todoName: DebugElement;
  let todoDescription: DebugElement;


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
      declarations: [TodoListAddPageComponent],
      imports: [HttpClientTestingModule, ToastrModule, RouterTestingModule],
      providers: [TodoListsService, NotificationService, { provide: ToastrService, useValue: toastrService }]
    });
    fixture = TestBed.createComponent(TodoListAddPageComponent);
    const compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);

    todoName = compiled.querySelector('#input_name');

  });


  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
  it('entering todo item name ', () => {
    let todoItem: TodoItem;
    todoName.nativeElement.value = "new todo item";
    component.model = todoItem;
    expect(todoItem.name).toBe("new todo item");

  });



});
