export interface Employer {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

export interface userCreate {}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
