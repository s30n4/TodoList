import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { TodoListsService } from '../../../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-pending-view',
  templateUrl: './todo-list-pending-view.component.html',
  styleUrls: ['./todo-list-pending-view.component.scss']
})
export class TodoListPendingViewComponent implements OnInit {
  public isLoadingTodoListItems = false;
  constructor(private todoListsService: TodoListsService) { }

  public todoListItems: TodoListItem[] = [];

  ngOnInit(): void {
    this.search();
  }


  public search() {
    this.isLoadingTodoListItems = true;
    this.todoListsService.getDoneTodoListItems(1, 10, "Name", false).subscribe(
      tasks => {
        this.todoListItems = tasks;
        this.isLoadingTodoListItems = false;
      },
      () => {

        this.isLoadingTodoListItems = false;
      }
    )
  }
}
