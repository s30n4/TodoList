import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../../../core/services/app-setttings.service';
import { TodoListItem } from './models/todo-list-item.model';
import { PagedQueryResult } from '../../../core/models/paged-query-result.model';
import { TodoItem } from './models/todo-item.model';
import { CommandResult } from '../../../core/models/command-result.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService  {
  private todoListsUrl = this.appSettings.getTodoListsApiServiceUrl();

  constructor(private http: HttpClient,
    private appSettings: AppSettingsService
  ) { }

  public getPendingTodoListItems(pageNumber: number, pageSize: number) {
    return this.http.get<PagedQueryResult<TodoListItem>>
      (`${this.todoListsUrl}/pending?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getDoneTodoListItems(pageNumber: number, pageSize: number) {
    return this.http.get<PagedQueryResult<TodoListItem>>
      (`${this.todoListsUrl}/done?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getTodoListItem(todoListItemId: string) {
    return this.http.get<TodoItem>
      (`${this.todoListsUrl}/${todoListItemId}`);
  }

  public addTodoListItem(model: TodoItem) {
    return this.http.post<CommandResult<string>>(`${this.todoListsUrl}`, model);
  }

  public updateTodoListItem(model: TodoItem) {
    return this.http.put<CommandResult<any>>(`${this.todoListsUrl}/${model.todoListItemId}`, model);
  }

  public markAsDone(todoListItemId: string) {
    return this.http.put<CommandResult<any>>(`${this.todoListsUrl}/${todoListItemId}/mark-as-done`, { todoListItemId });
  }

  public removeTodoListItem(todoListItemId: string) {
    return this.http.delete<CommandResult<any>>(`${this.todoListsUrl}/${todoListItemId}`);
  }

}
