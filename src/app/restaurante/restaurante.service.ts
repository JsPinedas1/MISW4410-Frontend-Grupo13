import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { AplicacionMovil } from "./aplicacionMovil";
import { Horario } from "./horario";
import { RedSocial } from "./redSocial";
import { Restaurante } from "./restaurante";

@Injectable({
  providedIn: "root"
})
export class RestauranteService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  darRestaurantes(): Observable<Restaurante[]> {
    const idUsuario = sessionStorage.getItem("idUsuario");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurantes/${idUsuario}`, { headers: headers })
  }

  crearRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    return this.http.post<Restaurante>(`${this.apiUrl}/restaurantes`, restaurante, { headers: headers })
  }

  editarRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    return this.http.post<Restaurante>(`${this.apiUrl}/restaurante_editar`, restaurante, { headers: headers })
  }

  darRestaurante(idRestaurante: number): Observable<Restaurante> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurante_editar/${idRestaurante}`, { headers: headers })
  }

  // consultarRedesSocialesRestaurante(idRestaurante: number): Observable<RedSocial[]> {
  //   const headers = new HttpHeaders({
  //     "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  //   })
  //   return this.http.get<RedSocial[]>(`${this.apiUrl}/red_social/${idRestaurante}`, { headers: headers })
  // }

  // consultarAplicacionesMovilesRestaurante(idRestaurante: number): Observable<AplicacionMovil[]> {
  //   const headers = new HttpHeaders({
  //     "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  //   })
  //   return this.http.get<AplicacionMovil[]>(`${this.apiUrl}/aplicacion_movil/${idRestaurante}`, { headers: headers })
  // }

  consultarHorarioRestaurante(idRestaurante: number): Observable<Horario[]> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    return this.http.get<Horario[]>(`${this.apiUrl}/horario/${idRestaurante}`, { headers: headers })
  }

  eliminarRestaurante(id: number): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
    return this.http.delete(`${this.apiUrl}/restaurante/${id}`, { headers: headers });
  }

  darRolUsuario(idUsuario: any): Observable<any> {
    const url = `${this.apiUrl}/usuario/info/${idUsuario}`;
    return this.http.get<any>(url);
  }
}
