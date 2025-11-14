export interface Payroll {
  id: string;
  employeeID: string;
  employeeName: string;
  employerID: string;
  referenceMonth: string;
  baseSalary: number;
  grossTotal: number;
  netTotal: number;
  totalDeductions: number;
  inss: number;
  irrf: number;
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
