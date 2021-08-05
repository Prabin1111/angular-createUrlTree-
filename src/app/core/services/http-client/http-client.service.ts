import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

export type Params =
  | HttpParams
  | {
      [param: string]: string | string[];
    };

export type Headers =
  | HttpHeaders
  | {
      [header: string]: string | string[];
    };

export interface HttpOptions {
  headers?: Headers;
  observe?: 'body' | undefined;
  params?: Params;
  reportProgress?: boolean | undefined;
  responseType?: 'json';
  withCredentials?: boolean | undefined;
}
const { baseUrl, v1 } = environment;
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private _httpOption: HttpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' }),
  };

  private _retryCount = 2;

  constructor(private _httpClient: HttpClient) {}

  get<R>(url: string, params: Params): Observable<R> {
    return this._httpClient
      .get<R>(`${baseUrl}/${v1}/${url}`, {
        ...this._httpOption,
        params,
      })
      .pipe(retry(this._retryCount));
  }

  post<T, R>(url: string, body: T | null, params?: Params): Observable<R> {
    return this._httpClient
      .post<R>(`${baseUrl}/${v1}/${url}`, body, { ...this._httpOption, params })
      .pipe(retry(this._retryCount));
  }

  delete<R>(url: string, params: Params): Observable<R> {
    return this._httpClient
      .delete<R>(`${baseUrl}/${v1}/${url}`, { ...this._httpOption, params })
      .pipe(retry(this._retryCount));
  }

  put<T, R>(url: string, body: T | null, params: Params): Observable<R> {
    return this._httpClient
      .put<R>(`${baseUrl}/${v1}/${url}`, body, { ...this._httpOption, params })
      .pipe(retry(this._retryCount));
  }

  patch<T, R>(url: string, body: T | null, params: Params): Observable<R> {
    return this._httpClient
      .patch<R>(`${baseUrl}/${v1}/${url}`, body, {
        ...this._httpOption,
        params,
      })
      .pipe(retry(this._retryCount));
  }
}
