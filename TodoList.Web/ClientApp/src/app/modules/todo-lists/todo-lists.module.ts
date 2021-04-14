import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TodoListsModuleRoutingModule } from './todo-lists-routing.module';
import { TodoListsPageComponent } from './pages/todo-lists-page/todo-lists-page.component';
import { TodoListPendingViewComponent } from './pages/todo-lists-page/components/todo-list-pending-view/todo-list-pending-view.component';
import { TodoListDoneViewComponent } from './pages/todo-lists-page/components/todo-list-done-view/todo-list-done-view.component';
import { TodoListAddPageComponent } from './pages/todo-list-add-page/todo-list-add-page.component';
import { TodoListViewPageComponent } from './pages/todo-list-view-page/todo-list-view-page.component';
import { TodoListEditPageComponent } from './pages/todo-list-edit-page/todo-list-edit-page.component';

@NgModule({
  declarations: [

  
    TodoListsPageComponent,
         TodoListPendingViewComponent,
         TodoListDoneViewComponent,
         TodoListAddPageComponent,
         TodoListViewPageComponent,
         TodoListEditPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    TodoListsModuleRoutingModule,
  ],
  exports: [
  ]
})
export class TodoListsModule { }
