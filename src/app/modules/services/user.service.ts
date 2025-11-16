import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, PagedResponse } from '../funcionario/employee.model';
import { environment } from 'src/environments/environment';
import { User, UserCreate, UserUpdate } from '../empresa/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  list(
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

  update(id: string, user: UserUpdate): Observable<UserUpdate> {
    return this.http.put<UserUpdate>(`${this.apiUrl}/${id}`, user);
  }

  create(user: UserCreate): Observable<UserCreate> {
    return this.http.post<UserCreate>(this.apiUrl, user);
  }

  getByID(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
