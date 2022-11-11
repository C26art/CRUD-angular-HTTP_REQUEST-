import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { CursoModel } from '../curso.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  alunos!:CursoModel[];
  displayedColumns:string[] = ['nome','telefone', 'email', 'cpf', 'editar','remover']
  dataSource!:MatTableDataSource<CursoModel>;

  constructor(private service:CursoService, private router:Router) { }

  ngOnInit(): void {
    this.alunos = this.service.list();
    this.dataSource = new MatTableDataSource(this.alunos);

    console.log(this.alunos)
  }

  list(){
    return this.alunos;
  }

  edit(id:string):void{
    this.router.navigate(["/clientes/edita",id])
  }

  delete(id:string):void{
    this.service.delete(id)
  }

}
