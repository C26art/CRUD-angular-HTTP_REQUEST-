import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './crud/create/create.component';
import { EditComponent } from './crud/edit/edit.component';
import { ListComponent } from './crud/list/list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'clientes/lista',
    pathMatch: 'full'
  },
  {
    path:'clientes/cadastro',
    component: CreateComponent,
  },
  {
    path: 'clientes/lista',
    component: ListComponent
  },
  {
    path:'clientes/edita/:id',
    component: EditComponent
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
