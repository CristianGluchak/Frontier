import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, PagedResponse } from '../funcionario/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private readonly apiUrl = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) {}

  /** 🔹 Busca paginada de funcionários com filtro opcional por nome */
  getEmployees(
    page: number,
    size: number,
    nameFilter?: string
  ): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nameFilter && nameFilter.trim().length > 0) {
      params = params.set('name', nameFilter.trim());
    }

    return this.http.get<PagedResponse<Employee>>(this.apiUrl, {
      params,
      withCredentials: true, // ✅ importante se o backend exige credenciais JWT ou cookies
    });
  }
}
