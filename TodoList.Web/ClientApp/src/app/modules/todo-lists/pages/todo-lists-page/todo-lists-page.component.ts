import { Component, ViewChild } from '@angular/core';
import { TodoListDoneViewComponent } from './components/todo-list-done-view/todo-list-done-view.component';

@Component({
  selector: 'app-todo-lists-page',
  templateUrl: './todo-lists-page.component.html',
  styleUrls: ['./todo-lists-page.component.scss']
})
export class TodoListsPageComponent {

  constructor() { }
  @ViewChild('todoListDoneView') public todoListDoneView: TodoListDoneViewComponent;

  onTodoListItemMarkedAsDone() {
    this.todoListDoneView.refresh();
  }

}
