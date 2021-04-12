import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { TodoListsService } from '../../../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-done-view',
  templateUrl: './todo-list-done-view.component.html',
  styleUrls: ['./todo-list-done-view.component.scss']
})
export class TodoListDoneViewComponent implements OnInit {
  public isLoadingTodoListItems = false;
  constructor(private todoListsService: TodoListsService) { }



  public todoListItems: TodoListItem[] = [];


  public pageSize: number = 5;
  public pageNumber: number = 1;
  public sortExpression: string = "Name";
  public totalCount: number = 0;



  ngOnInit(): void {
    this.search();
  }


  public search() {
    this.isLoadingTodoListItems = true;
    this.todoListsService.getDoneTodoListItems(this.pageNumber, this.pageSize, this.sortExpression, false).subscribe(
      response => {
        this.todoListItems = response.list;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageIndex;

        this.isLoadingTodoListItems = false;
      },
      () => {

        this.isLoadingTodoListItems = false;
      }
    )
  }

  onPageChanged(page: number): void {
    this.pageNumber = page;
    this.search();
  }

}
