import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoItem } from '../../shared/models/todo-item.model';
import { TodoListsService } from '../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-edit-page',
  templateUrl: './todo-list-edit-page.component.html',
  styleUrls: ['./todo-list-edit-page.component.scss']
})
export class TodoListEditPageComponent  implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private todoListsService: TodoListsService) { }

  private todoListItemId: string;
  public isLoading = false;
  public model: TodoItem;


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      p => {
        this.todoListItemId = p.get('todoListItemId');
        this.loadTodoListItem();
      }
    );
  }

  private loadTodoListItem() {
    this.isLoading = true;
    this.todoListsService.getTodoListItem(this.todoListItemId)
      .subscribe(result => {
        this.model = result;
        this.isLoading = false;
      },
        () => {
          this.notification.showError("Something went wrong while loading todo list item details");
          this.isLoading = false;
        }
      );
  }


  public updateTodoListItem() {
    this.isLoading = true;
    this.todoListsService.updateTodoListItem(this.model)
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
          this.notification.showError('Something went wrong while updating the todo list item');
          this.isLoading = false;
        }
      );
  }


}