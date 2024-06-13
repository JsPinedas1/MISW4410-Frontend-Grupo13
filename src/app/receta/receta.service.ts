import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Receta } from './receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  darRecetas(): Observable<Receta[]> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Receta[]>(`${this.apiUrl}/recetas/${idUsuario}`, { headers: headers })
  }

  darReceta(idReceta: number): Observable<Receta> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Receta>(`${this.apiUrl}/receta/${idReceta}`, { headers: headers })
  }

  crearReceta(receta: Receta): Observable<Receta> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Receta>(`${this.apiUrl}/recetas/${idUsuario}`, receta, { headers: headers })
  }

  editarReceta(receta: Receta): Observable<Receta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Receta>(`${this.apiUrl}/receta/${receta.id}`, receta, { headers: headers })
  }


  borrarReceta(idReceta: number): Observable<Receta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Receta>(`${this.apiUrl}/receta/${idReceta}`, { headers: headers })
  }

}
