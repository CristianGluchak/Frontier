import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedResponse, Payroll } from '../calcula-folha/payroll.model';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  private readonly apiUrl = `${environment.apiUrl}/payroll`;

  constructor(private http: HttpClient) {}

  /** 🔹 Busca paginada de folhas de pagamento */
  getPayrolls(
    page: number,
    size: number,
    referenceMonth?: string
  ): Observable<PagedResponse<Payroll>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (referenceMonth && referenceMonth.trim()) {
      params = params.set('referenceMonth', referenceMonth);
    }

    return this.http.get<PagedResponse<Payroll>>(this.apiUrl, {
      params,
      withCredentials: true,
    });
  }

  /** 🔹 Busca uma folha específica */
  getPayrollById(id: string): Observable<Payroll> {
    return this.http.get<Payroll>(`${this.apiUrl}/${id}`);
  }

  calculateAll(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/employee/all`,
      {},
      { withCredentials: true }
    );
  }

  recalculateSingle(id: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/employee/${id}`,
      {},
      { withCredentials: true }
    );
  }
}
