import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../../../core/services/app-setttings.service';
import { TodoListItem } from './models/todo-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {
  private todoListsUrl = this.appSettings.getTodoListsApiServiceUrl();

  constructor(
    private http: HttpClient,
    private appSettings: AppSettingsService
  ) { }


  public getPendingTodoListItems( pageNumber: number, pageSize: number, sortExpression:string, orderByDescending:boolean) {
    return this.http.get<TodoListItem[]>
      (`${this.todoListsUrl}/pending?pageNumber=${pageNumber}&pageSize=${pageSize}&sortExpression=${sortExpression}&orderByDescending=${orderByDescending}`);
  }

  public getDoneTodoListItems(pageNumber: number, pageSize: number, sortExpression: string, orderByDescending: boolean) {
    return this.http.get<TodoListItem[]>
      (`${this.todoListsUrl}/done?pageNumber=${pageNumber}&pageSize=${pageSize}&sortExpression=${sortExpression}&orderByDescending=${orderByDescending}`);
  }

}
