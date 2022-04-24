import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Alunos} from "./alunos/alunos";

const routes: Routes = [
  {path: "/getAlunos", component:Alunos.getAll},
  {path: "/saveAlunos", component:Alunos.save},
  {path: "/searchAlunos", component:Alunos.find}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
