import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { TodoListsService } from '../../../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-pending-view',
  templateUrl: './todo-list-pending-view.component.html',
  styleUrls: ['./todo-list-pending-view.component.scss']
})
export class TodoListPendingViewComponent implements OnInit {

  constructor(public todoListsService: TodoListsService, private notification: NotificationService) { }

  public todoListItems: TodoListItem[] = [];
  public isLoading = false;
  public pageSize: number = 5;
  public pageNumber: number = 1;
  public totalCount: number = 0;

  @Output() readonly todoListItemMarkedAsDone = new EventEmitter<string>();

  ngOnInit(): void {
    this.search();
  }


  public search() {
    this.isLoading = true;
    this.todoListsService
      .getPendingTodoListItems(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.todoListItems = response.list;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageIndex;
        this.isLoading = false;
      },
        () => {
          this.notification.showError("Something went wrong while loading the todo list");
          this.isLoading = false;
        }
      )
  }

  onPageChanged(page: number): void {
    this.pageNumber = page;
    this.search();
  }

  public markAsDoneTodoListItem(todoListItemId: string) {
    this.isLoading = true;
    this.todoListsService.markAsDone(todoListItemId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.notification.showSuccess(response.message);
          this.todoListItemMarkedAsDone.emit("test");
          this.refresh();
        }
        else {
          this.notification.showErrors(response.errors, response.message);

        }

        this.isLoading = false;
      },
        () => {
          this.notification.showError('Something went wrong while mark as done the todo list item');
          this.isLoading = false;
        }
      );
  }

  deleteTodoListItem(todoListItemId: string) {
    this.isLoading = true;
    this.todoListsService.removeTodoListItem(todoListItemId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.notification.showSuccess(response.message);

          this.refresh();
        }
        else {
          this.notification.showErrors(response.errors, response.message);

        }

        this.isLoading = false;
      },
        () => {
          this.notification.showError('Something went wrong while deleting the todo list item');
          this.isLoading = false;
        }
      );
  }

  private refresh() {
    this.pageNumber = 1;
    this.search();
  }

}
