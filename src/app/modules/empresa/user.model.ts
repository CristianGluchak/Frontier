export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

export interface UserCreate {
  name: string;
  password: string;
  email: string;
}

export interface UserUpdate {
  name: string;
  email: string;
  password: string;
  status: string;
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
