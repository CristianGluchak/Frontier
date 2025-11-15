import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, PagedResponse } from '../funcionario/employee.model';
import { environment } from 'src/environments/environment';
import { User } from '../empresa/employer.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  /** 🔹 Busca paginada de funcionários com filtro opcional por nome */
  listUsuarios(
    page: number,
    size: number,
    nameFilter?: string
  ): Observable<PagedResponse<User>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nameFilter && nameFilter.trim().length > 0) {
      params = params.set('name', nameFilter.trim());
    }

    return this.http.get<PagedResponse<User>>(this.apiUrl, {
      params,
      withCredentials: true,
    });
  }

  updateEmployee(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  /** 🔹 Cria um novo funcionário */
  createEmployee(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getEmployeeById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
