import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutMainComponent } from '../shared/components/layout-main/layout-main.component';
import { TodoListAddPageComponent } from './pages/todo-list-add-page/todo-list-add-page.component';
import { TodoListViewPageComponent } from './pages/todo-list-view-page/todo-list-view-page.component';
import { TodoListsPageComponent } from './pages/todo-lists-page/todo-lists-page.component';


const routes: Routes = [
  {
    path: 'todo-list',
    component: LayoutMainComponent,
    children:
      [
        { path: '', component: TodoListsPageComponent, data: { title: 'Todo List'} },
        { path: 'new', component: TodoListAddPageComponent, data: { title: 'New Todo List'} },
        { path: 'view/:todoListItemId', component: TodoListViewPageComponent, data: { title: 'View Todo List' } },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListsModuleRoutingModule { }
