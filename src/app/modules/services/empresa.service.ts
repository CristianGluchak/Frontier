import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Empresa {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private readonly apiUrl = `${environment.apiUrl}/employer`;

  constructor(private http: HttpClient) {}

  /** Busca os dados da empresa */
  getEmpresa(id: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  /** Atualiza os dados da empresa */
  updateEmpresa(id: string, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/${id}`, empresa);
  }
}
