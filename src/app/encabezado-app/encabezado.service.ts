import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Encabezado } from './encabezado';

@Injectable({
  providedIn: 'root'
})
export class EncabezadoService {

  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

darRolUsuario(idUsuario: any): Observable<any> {
  const url = `${this.apiUrl}/usuario/info/${idUsuario}`;
  return this.http.get<any>(url);
}

}
