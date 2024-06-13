import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Chef } from './chef';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

darUsuariosPorRestaurante(idRestaurantes: any): Observable<Chef[]> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  let queryParams = new HttpParams().append("restaurantes_ids", idRestaurantes.toString())
  return this.http.get<Chef[]>(`${this.apiUrl}/chefs`, { headers: headers, params: queryParams })
}

darChef(chefId: any): Observable<Chef> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.get<Chef>(`${this.apiUrl}/dar/chef/${chefId}`, { headers: headers })
}

modificarChef(id: string, nombre: string, usuario: string, contrasena: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  const body = { id, usuario, nombre, contrasena };
  return this.http.put(`${this.apiUrl}/usuario/editar/${id}`, body, { headers: headers });
}

eliminarChef(id: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  const url = `${this.apiUrl}/usuario/editar/${id}`;
  return this.http.delete(url, { headers: headers });
}

crearChef(nombre: string, usuario: string, contrasena: string, idRestaurante: string): Observable<any> {
  const body = { nombre, usuario, contrasena, idRestaurante};
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.post(`${this.apiUrl}/usuario`, body, { headers: headers });
}

trasladarChef(chefId: string, idRestaurante: string): Observable<any> {
  const body = { id_restaurante: idRestaurante };
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.post(`${this.apiUrl}/transferir/${chefId}`, body, { headers: headers });
}

}
