import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../../../../shared/models/todo-list-item.model';
import { TodoListsService } from '../../../../shared/todo-lists.service';

@Component({
  selector: 'app-todo-list-done-view',
  templateUrl: './todo-list-done-view.component.html',
  styleUrls: ['./todo-list-done-view.component.scss']
})
export class TodoListDoneViewComponent implements OnInit {
  public isLoading = false;
  constructor(private todoListsService: TodoListsService) { }

  public todoListItems: TodoListItem[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 1;
  public totalCount: number = 0;


  ngOnInit(): void {
    this.search();
  }


  public search() {
    this.isLoading = true;
    this.todoListsService.getDoneTodoListItems(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.todoListItems = response.list;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageIndex;

        this.isLoading = false;
      },
        () => {

          this.isLoading = false;
        }
      )
  }

  onPageChanged(page: number): void {
    this.pageNumber = page;
    this.search();
  }

}
