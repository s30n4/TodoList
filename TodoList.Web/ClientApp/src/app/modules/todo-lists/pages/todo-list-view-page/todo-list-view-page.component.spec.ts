import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TodoListViewPageComponent } from './todo-list-view-page.component';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoListsService } from '../../shared/todo-lists.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoListViewPageComponent', () => {
  let component: TodoListViewPageComponent;
  let fixture: ComponentFixture<TodoListViewPageComponent>;
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
      declarations: [TodoListViewPageComponent],
      imports: [HttpClientTestingModule, ToastrModule, RouterTestingModule],
      providers: [TodoListsService, NotificationService, { provide: ToastrService, useValue: toastrService }]
    });
    fixture = TestBed.createComponent(TodoListViewPageComponent);
    const compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    service = TestBed.get(TodoListsService);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
