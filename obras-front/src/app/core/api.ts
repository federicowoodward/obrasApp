import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Si tu back devuelve { data, error }, lo seguimos soportando.
// Si devuelve el objeto "raw" (p.ej. { deleted: true }), también.
type MaybeWrapped<T> = T | { data: T; error?: any };

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  request<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    params?: Record<string, any>,
    headers?: HttpHeaders
  ): Observable<T> {
    const fullUrl = `${this.baseUrl}/${url}`;

    const sanitizedParamsObj: Record<string, string> = {};
    Object.entries(params ?? {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null) sanitizedParamsObj[k] = String(v);
    });

    const options = {
      headers:
        headers ?? new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams({ fromObject: sanitizedParamsObj }),
      body: data !== undefined ? data : undefined,
    } as const;

    const req$ = this.http.request<MaybeWrapped<T>>(method, fullUrl, options);
    return req$.pipe(
      tap((resp) => {
        console.groupCollapsed(`[API] ${method} ${fullUrl}`);
        if (data !== undefined) console.log('Body:', data);
        if (Object.keys(sanitizedParamsObj).length)
          console.log('Params:', sanitizedParamsObj);
        console.log('Response:', resp);
        console.groupEnd();
      }),
      map((resp: any) => ('data' in resp ? (resp.data as T) : (resp as T)))
    );
  }
}
