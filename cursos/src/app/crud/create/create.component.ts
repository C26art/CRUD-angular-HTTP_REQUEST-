import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import { CursoService } from 'src/app/services/curso.service';
import { CepModel } from '../cep.model';
import { CursoModel } from '../curso.model';





@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formAluno!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private service:CursoService
  ) { }

  ngOnInit(): void {
    this.formAluno = this.formBuilder.group({
      nome:[''],
      cpf:['',[Validators.required,Validators.pattern(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/)]],
      telefone:['',[Validators.required,Validators.pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})$/)]],
      endereco:this.formBuilder.group({
        cep:['',[Validators.required,Validators.pattern(/^\d{5}\-?\d{3}$/)]],
        logradouro:['',[Validators.required]],
        complemento:['',],
        bairro:['',[Validators.required]],
        localidade:['',[Validators.required]],
        uf:['',[Validators.required]]
      }),
    })
  }



  cadastrar():void{

    const aluno = this.formAluno.getRawValue() as CursoModel;
    this.service.register(aluno);
  }

  buscarCEP(){
    const cep = this.formAluno.get('endereco')?.getRawValue() as CepModel;
    console.log(cep)
    const recebendoCEP = this.service.getCEP(cep.cep);
    recebendoCEP.subscribe({
      next:(cep)=>{
        this.atualizarForm(cep)
      },
      error: (err)=>{
        console.log(err)
      }
    })
    console.log(recebendoCEP)
  }

  atualizarForm(endereco:CepModel){
    this.formAluno.get("endereco")?.patchValue({
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      localidade:endereco.localidade,
      uf: endereco.uf
    })
  }









  get nome(){  return this.formAluno.get("nome")!}
  get cpf(){return this.formAluno.get("cpf")!}
  get telefone(){return this.formAluno.get("telefone")!}

  get cep(){return this.formAluno.get("endereco")?.get("cep")!}
  get logradouro(){return this.formAluno.get("endereco")?.get("logradouro")!}

  get bairro(){return this.formAluno.get("endereco")?.get("bairro")!}
  get localidade(){return this.formAluno.get("endereco")?.get("localidade")!}
  get uf(){return this.formAluno.get("endereco")?.get("uf")!}
}

