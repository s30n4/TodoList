import { TodoListDoneViewComponent } from './todo-list-done-view.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListsService } from '../../../../shared/todo-lists.service';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';

describe('TodoListDoneViewComponent', () => {
  let component: TodoListDoneViewComponent;
  let fixture: ComponentFixture<TodoListDoneViewComponent>;
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
      declarations: [TodoListDoneViewComponent],
      imports: [HttpClientTestingModule, ToastrModule],
      providers: [TodoListsService, NotificationService, { provide: ToastrService, useValue: toastrService }]
    });
    fixture = TestBed.createComponent(TodoListDoneViewComponent);

    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
