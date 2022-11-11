import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CursoModel } from '../curso.model';
import { CursoService } from './../../services/curso.service';
import { CepModel } from './../cep.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formEditarAluno!:FormGroup;
  customerEntity!:CursoModel

  constructor(
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private service:CursoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.customerEntity = this.service.getCustomerById(id);


    this.formEditarAluno = this.formBuilder.group({
      nome:['',[Validators.required]],
      email:['',[Validators.required]],
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

    this.loadForm(this.customerEntity)
  }

  loadForm(customer:CursoModel){
    this.formEditarAluno.patchValue({
      nome: customer.nome,
      email: customer.email,
      cpf: customer.cpf,
      telefone: customer.telefone,
      endereco: customer.endereco
    })
  }

  edit(){
    this.customerEntity.nome = this.nome.value;
    this.customerEntity.email = this.email.value;
    this.customerEntity.cpf = this.cpf.value;
    this.customerEntity.telefone = this.telefone.value;
    this.customerEntity.endereco.cep = this.cep.value;
    this.customerEntity.endereco.logradouro = this.logradouro.value;
    this.customerEntity.endereco.complemento = this.complemento.value;
    this.customerEntity.endereco.bairro = this.bairro.value;
    this.customerEntity.endereco.localidade = this.localidade.value;
    this.customerEntity.endereco.uf = this.uf.value;

    this.service.edit(this.customerEntity)
  }

  verifyCEP(){
    const endereco = this.formEditarAluno.get("endereco")?.getRawValue() as CepModel;

    const receivedCEP = this.service.getCEP(endereco.cep).subscribe({
      next: (end)=>{
        this.formEditarAluno.get("endereco")?.patchValue({
          logradouro: end.logradouro,
          bairro: end.bairro,
          localidade: end.localidade,
          uf: end.uf,
        })
      },
      error:(err)=>{console.log(err)}
    })
  }


  get nome(){  return this.formEditarAluno.get("nome")!}
  get email(){  return this.formEditarAluno.get("email")!}
  get cpf(){return this.formEditarAluno.get("cpf")!}
  get telefone(){return this.formEditarAluno.get("telefone")!}

  get cep(){return this.formEditarAluno.get("endereco")?.get("cep")!}
  get logradouro(){return this.formEditarAluno.get("endereco")?.get("logradouro")!}
  get complemento(){return this.formEditarAluno.get("endereco")?.get("complemento")!};
  get bairro(){return this.formEditarAluno.get("endereco")?.get("bairro")!}
  get localidade(){return this.formEditarAluno.get("endereco")?.get("localidade")!}
  get uf(){return this.formEditarAluno.get("endereco")?.get("uf")!}
}
