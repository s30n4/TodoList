import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CommandResult } from "../../../core/models/command-result.model";
import { PagedQueryResult } from "../../../core/models/paged-query-result.model";
import { AbstractTodoListsService } from "./abstract-todo-lists.service";
import { TodoItem } from "./models/todo-item.model";
import { TodoListItem } from "./models/todo-list-item.model";

@Injectable({
  providedIn: 'root'
})
export class MockTodoListsService implements AbstractTodoListsService {
  private readonly todoListItems: TodoListItem[];
  private readonly todoItem: TodoItem;
  constructor() {
    this.todoListItems = new Array<TodoListItem>();
    this.todoListItems.push(new TodoListItem(), { name: "Todo list item 1", description: "Todo list description 1", completedOn: "", dueDate: "15-04-2021", todoListItemId: "1" });
    this.todoListItems.push({ name: "Todo list item 2", description: "Todo list description 2", completedOn: "", dueDate: "", todoListItemId: "2" });
    this.todoListItems.push(new TodoListItem(), { name: "Todo list item 4", description: "Todo list description 3", completedOn: "15-04-2021", dueDate: "15-04-2021", todoListItemId: "3" });
    this.todoListItems.push({ name: "Todo list item 4", description: "Todo list description 4", completedOn: "15-04-2021", dueDate: "", todoListItemId: "4" });

    this.todoItem = new TodoItem();
    this.todoItem.name = "Todo list item 1";
    this.todoItem.description = "Todo list description 1";
    this.todoItem.dueDate = "15-04-2021";
    this.todoItem.todoListItemId = "1";
    this.todoItem.statusName = "Pending";
  }

  public getPendingTodoListItems(pageNumber: number, pageSize: number): Observable<PagedQueryResult<TodoListItem>> {
    let todoListItems = new Array<TodoListItem>();
    todoListItems.push(new TodoListItem(), { name: "Todo list item 1", description: "Todo list description 1", completedOn: "", dueDate: "15-04-2021", todoListItemId: "1" });
    todoListItems.push({ name: "Todo list item 2", description: "Todo list description 2", completedOn: "", dueDate: "", todoListItemId: "2" });
    todoListItems.push(new TodoListItem(), { name: "Todo list item 3", description: "Todo list description 3", completedOn: "", dueDate: "15-04-2021", todoListItemId: "3" });

    let result = new PagedQueryResult<TodoListItem>();
    result.list = todoListItems;
    result.pageIndex = 1;
    result.pageSize = 5;
    result.totalCount = 3;

    return of(result);

  }
  public getDoneTodoListItems(pageNumber: number, pageSize: number): Observable<PagedQueryResult<TodoListItem>> {
    let todoListItems = new Array<TodoListItem>();
    this.todoListItems.push(new TodoListItem(), { name: "Todo list item 3", description: "Todo list description 3", completedOn: "15-04-2021", dueDate: "15-04-2021", todoListItemId: "3" });
    this.todoListItems.push({ name: "Todo list item 4", description: "Todo list description 4", completedOn: "15-04-2021", dueDate: "", todoListItemId: "4" });
    this.todoListItems.push({ name: "Todo list item 5", description: "Todo list description 5", completedOn: "15-04-2021", dueDate: "", todoListItemId: "5" });

    let result = new PagedQueryResult<TodoListItem>();
    result.list = todoListItems;
    result.pageIndex = pageNumber;
    result.pageSize = pageSize;
    result.totalCount = 3;

    return of(result);
  }
  public getTodoListItem(todoListItemId: string): Observable<TodoItem> {
    this.todoItem.todoListItemId = todoListItemId;

    return of(this.todoItem);
  }
  public addTodoListItem(model: TodoItem): Observable<CommandResult<string>> {
    const result = new CommandResult<string>();

    result.isSuccessful = true;
    result.result = "10";
    result.message = "The todo list item was added successfully";

    return of(result);
  }
  public updateTodoListItem(model: TodoItem): Observable<CommandResult<any>> {
    const result = new CommandResult<string>();

    result.isSuccessful = true;
    result.message = "The todo list item was updated successfully";

    return of(result);
  }
  public markAsDone(todoListItemId: string): Observable<CommandResult<any>> {
    const result = new CommandResult<string>();

    result.isSuccessful = true;
    result.message = "The todo list item was done successfully";

    return of(result);
  }
  public removeTodoListItem(todoListItemId: string): Observable<CommandResult<any>> {
    const result = new CommandResult<string>();
    result.isSuccessful = true;
    result.message = "The todo list item was deleted successfully";

    return of(result);
  }
}
