import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import * as uuid from 'uuid';
import { CursoModel } from '../crud/curso.model';
import { CepModel } from '../crud/cep.model';
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http:HttpClient) { }

  register(customer:CursoModel){
    customer.id = uuid.v4()

    let customers:CursoModel[] = this.list();
    customers.push(customer);


    //memo: remember to try to validate the CPF later when there's more time
    localStorage.setItem('customers',JSON.stringify(customers))
  }

  list():CursoModel[]{
    let customerList = JSON.parse(localStorage.getItem('customers')!) as CursoModel[] ?? [];
    return customerList;
  }

  delete(id:string){
    let customers:CursoModel[] = this.list();

    customers = customers.filter(customer => customer.id !== id)

    localStorage.setItem('customers',JSON.stringify(customers))
  }

  getCustomerById(id:string){
    const customers: CursoModel[] = this.list();
    let customer!:CursoModel;
      for(let i = 0 ; i<customers.length; i++){
        if(customers[i].id === id) customer = customers[i];
      }

    return customer;
  }

  edit(customer:CursoModel){
    let customers:CursoModel[] = this.list();

    customers.forEach((c,i,customers)=>{
      if(customer.id === c.id){
        customers[i] = customer;
      }
    })
    localStorage.setItem('customers', JSON.stringify(customers))
  }


  getCEP(ceps:string):Observable<CepModel>{
    const cep = this.http.get<CepModel>(`http://viacep.com.br/ws/${ceps}/json/`);
    return cep;
  }
}
