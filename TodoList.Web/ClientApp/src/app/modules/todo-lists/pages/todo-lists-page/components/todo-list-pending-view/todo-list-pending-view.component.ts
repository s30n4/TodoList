import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { TodoListsService } from '../../../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-pending-view',
  templateUrl: './todo-list-pending-view.component.html',
  styleUrls: ['./todo-list-pending-view.component.scss']
})
export class TodoListPendingViewComponent implements OnInit {

  constructor(private todoListsService: TodoListsService, private notification: NotificationService) { }

  public todoListItems: TodoListItem[] = [];
  public isLoading = false;
  public pageSize: number = 5;
  public pageNumber: number = 1;
  public totalCount: number = 0;

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

}
