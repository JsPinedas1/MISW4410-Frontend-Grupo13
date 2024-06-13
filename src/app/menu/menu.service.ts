import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Menu } from './menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from './compra';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient,
  private router: ActivatedRoute) { }

darIdRestaurante(idUsuario: any): Observable<any> {
  const url = `${this.apiUrl}/restaurantes/${idUsuario}`;
  const headers = new HttpHeaders({
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.get<any>(url, { headers: headers });
}

crearMenu(menu: Menu, restauranteId: number): Observable<Menu> {
  const idUsuario = sessionStorage.getItem('idUsuario');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.post<Menu>(`${this.apiUrl}/menus/${idUsuario}/${restauranteId}`, menu, { headers: headers })
}

darMenus(restauranteId: number): Observable<Menu[]> {
  const idUsuario = sessionStorage.getItem('idUsuario');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.get<Menu[]>(`${this.apiUrl}/menus/${idUsuario}/${restauranteId}`, { headers: headers })
}

borrarMenu(idMenu: number): Observable<Menu> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.delete<Menu>(`${this.apiUrl}/menu/${idMenu}`, { headers: headers })
}

darMenu(idMenu: number): Observable<Menu> {
  const idUsuario = sessionStorage.getItem('idUsuario');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.get<Menu>(`${this.apiUrl}/menu/${idMenu}`, { headers: headers })
}

darRecetas(idMenu: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.get<any>(`${this.apiUrl}/menu/recetas/${idMenu}`, { headers: headers })
}

editarMenu(menu: Menu, idMenu: number): Observable<Menu> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  return this.http.put<Menu>(`${this.apiUrl}/menu/${idMenu}`, menu, { headers: headers })
}

validarFechasEditar(start_date: string, end_date: string, id_menu: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  const data = {
    fechainicio: start_date,
    fechafinal: end_date,
    id_menu: id_menu,
  };
  return this.http.post<any>(`${this.apiUrl}/menu/editar/validar-fechas/`, data, { headers: headers });
}

validarFechasCrear(start_date: string, end_date: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
  const data = {
    fechainicio: start_date,
    fechafinal: end_date,
  };
  return this.http.post<any>(`${this.apiUrl}/menu/crear/validar-fechas/`, data, { headers: headers });
}

consultarCompras(idMenu: number): Observable<any> {
  const url = `${this.apiUrl}/compras/${idMenu}`;
  const headers = new HttpHeaders({
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.get<Compra[]>(url, { headers: headers });
}

}
