import { CepModel } from "./cep.model";


export interface CursoModel {
  id:string,
  nome:string,
  email: string,
  cpf:number,
  telefone:string,
  endereco:CepModel,
}
