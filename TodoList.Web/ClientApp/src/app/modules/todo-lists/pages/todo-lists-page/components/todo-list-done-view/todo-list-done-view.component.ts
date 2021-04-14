import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { TodoListsService } from '../../../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-done-view',
  templateUrl: './todo-list-done-view.component.html',
  styleUrls: ['./todo-list-done-view.component.scss']
})
export class TodoListDoneViewComponent implements OnInit {
  public isLoading = false;
  constructor(private todoListsService: TodoListsService, private notification: NotificationService) { }

  public todoListItems: TodoListItem[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 1;
  public totalCount: number = 0;


  ngOnInit(): void {
    this.search();
  }


  public search() {
    this.isLoading = true;
    this.todoListsService.getDoneTodoListItems(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.todoListItems = response.list;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageIndex;

        this.isLoading = false;
      },
        () => {

          this.isLoading = false;
        }
      )
  }

  onPageChanged(page: number): void {
    this.pageNumber = page;
    this.search();
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


  refresh() {
    this.pageNumber = 1;
    this.search();
  }
}
