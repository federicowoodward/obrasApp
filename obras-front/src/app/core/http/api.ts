import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// GET y DELETE NO envian datos
// POST Y PUT, PATCH envian datos

interface ApiResponse<T> {
  data: T;
  error: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  request<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    params?: any,
    headers?: HttpHeaders
  ): Observable<T> {
    const fullUrl = `${this.baseUrl}/${url}`;

    const options = {
      headers:
        headers || new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams({ fromObject: params || {} }),
    };

    let req$: Observable<ApiResponse<T>>;

    switch (method) {
      case 'GET':
        req$ = this.http.get<ApiResponse<T>>(fullUrl, options);
        break;
      case 'POST':
        req$ = this.http.post<ApiResponse<T>>(fullUrl, data, options);
        break;
      case 'PUT':
        req$ = this.http.put<ApiResponse<T>>(fullUrl, data, options);
        break;
      case 'PATCH':
        req$ = this.http.patch<ApiResponse<T>>(fullUrl, data, options);
        break;
      case 'DELETE':
        req$ = this.http.delete<ApiResponse<T>>(fullUrl, options);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return req$.pipe(
      tap((resp) => {
        console.groupCollapsed(`[API] ${method} ${fullUrl}`);
        if (data) console.log('Body:', data);
        if (params) console.log('Params:', params);
        if (resp.data) {
          console.log('Response data:', resp.data);
        }
        if (resp.error) {
          console.error('API Error:', resp.error);
        }
        console.groupEnd();
      }),
      map((resp) => {
        if (resp.error) {
          throw resp.error;
        }
        return resp.data;
      })
    );
  }
}
