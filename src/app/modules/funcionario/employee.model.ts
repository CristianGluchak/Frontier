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
