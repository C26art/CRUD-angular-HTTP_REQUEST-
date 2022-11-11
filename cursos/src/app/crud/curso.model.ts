import { CepModel } from "./cep.model";


export interface CursoModel {
  id:string,
  nome:string,
  cpf:number,
  telefone:string,
  endereco:CepModel,
}
