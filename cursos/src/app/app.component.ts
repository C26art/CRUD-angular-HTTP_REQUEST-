import { Component } from '@angular/core';
import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cursos';

  crud2!: string;

  constructor(
    private  router:Router,
  ){}

  toCreate(){
    this.router.navigate(["/clientes/cadastro"])
  }
  toList(){
    this.router.navigate(["/clientes/lista"])
  }
}
