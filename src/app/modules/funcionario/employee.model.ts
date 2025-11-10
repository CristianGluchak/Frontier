export interface Employee {
  id: string;
  name: string;
  cpf: string;
  position: string;
  hours: string;
  salary: number;
  status: string;
  inactivationDate?: string;
  employerFantasyName?: string;
  gender?: string;
  civilstate?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  nationality?: string;
  address?: EmployeeAddress;
}

export interface EmployeeAddress {
  id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  cep: string;
}

export interface EmployeeCreate {
  name: string;
  cpf: string;
  position: string;
  hours: string;
  salary: number;
  employerId: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
