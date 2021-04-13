import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoItem } from '../../shared/models/todo-item.model';
import { TodoListsService } from '../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-add-page',
  templateUrl: './todo-list-add-page.component.html',
  styleUrls: ['./todo-list-add-page.component.scss']
})
export class TodoListAddPageComponent {

  public model = new TodoItem();
  public isLoading = false;

  constructor(private todoListsService: TodoListsService
    , private router: Router
    , private notification: NotificationService) { }

  public saveTodoListItem() {
    this.isLoading = true;
    this.todoListsService.addTodoListItem(this.model)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.notification.showSuccess(response.message);
          this.router.navigate(['todo-list']);
        }
        else {
          this.notification.showErrors(response.errors, response.message);

        }

        this.isLoading = false;
      },
        () => {
          this.notification.showError('Something went wrong while creating the todo list item');
          this.isLoading = false;
        }
      );
  }

}
