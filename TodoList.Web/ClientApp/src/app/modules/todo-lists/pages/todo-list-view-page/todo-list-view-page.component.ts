import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { TodoItem } from '../../shared/models/todo-item.model';
import { TodoListsService } from '../../shared/todo-lists.service';
import validator from 'validator';
import { InputDateComponent } from '../../../shared/components/input-date/input-date.component';

@Component({
  selector: 'app-todo-list-view-page',
  templateUrl: './todo-list-view-page.component.html',
  styleUrls: ['./todo-list-view-page.component.scss']
})
export class TodoListViewPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private todoListsService: TodoListsService) { }

  private todoListItemId: string;
  public isLoading = false;
  public model: TodoItem;

  InputDateComponent

  @ViewChild('inputDueDate') public inputDueDate: InputDateComponent;

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


  public markAsDoneTodoListItem() {
    this.isLoading = true;
    this.todoListsService.markAsDone(this.todoListItemId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.notification.showSuccess(response.message);
          this.loadTodoListItem();
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
