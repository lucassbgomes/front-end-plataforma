export interface IPlataform {
  nome: string;
  dataInicial: string | null;
  dataFinal: string | null;
  infosPropriedade: IPlataformPropertyInfo;
  cnpj: string;
  laboratorio: IPlataformLaboratory;
  observacoes: string;
}

export interface IPlataformPropertyInfo {
  id: number;
  nome: string;
  cnpj: string;
}

export interface IPlataformLaboratory {
  id: number;
  nome: string;
}
