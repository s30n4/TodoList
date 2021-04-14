import { Observable } from "rxjs";
import { TodoListItem } from './models/todo-list-item.model';
import { PagedQueryResult } from '../../../core/models/paged-query-result.model';
import { TodoItem } from './models/todo-item.model';
import { CommandResult } from '../../../core/models/command-result.model';

export abstract class AbstractTodoListsService{
  public abstract getPendingTodoListItems(pageNumber: number, pageSize: number): Observable<PagedQueryResult<TodoListItem>>;
  public abstract getDoneTodoListItems(pageNumber: number, pageSize: number): Observable<PagedQueryResult<TodoListItem>>;
  public abstract getTodoListItem(todoListItemId: string): Observable<TodoItem>;
  public abstract addTodoListItem(model: TodoItem): Observable<CommandResult<string>>;
  public abstract updateTodoListItem(model: TodoItem): Observable<CommandResult<any>>;
  public abstract markAsDone(todoListItemId: string): Observable<CommandResult<any>>;
  public abstract removeTodoListItem(todoListItemId: string): Observable<CommandResult<any>>;
}
