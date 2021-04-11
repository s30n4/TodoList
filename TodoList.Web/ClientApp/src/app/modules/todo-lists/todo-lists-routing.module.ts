import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutMainComponent } from '../shared/layout-main/layout-main.component';
import { TodoListsPageComponent } from './pages/todo-lists-page/todo-lists-page.component';


const routes: Routes = [
  {
    path: 'todo-lists',
    component: LayoutMainComponent,
    children:
      [
        { path: '', component: TodoListsPageComponent, data: {} },

      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListsModuleRoutingModule { }
