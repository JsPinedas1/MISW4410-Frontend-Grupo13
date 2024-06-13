import { Receta } from './../receta/receta';

export class Menu {

  id_menu:number;
  id_usuario:string;
  id_restaurante:string;
  nombre_restaurante:string;
  nombre:string;
  fechainicio:string;
  fechafinal:string;
  recetas: Array<Receta>

  public constructor(id_menu: number, id_usuario: string, id_restaurante: string, nombre_restaurante: string, fechainicio: string, fechafinal:string, nombre: string) {
    this.id_menu = id_menu;
    this.id_usuario = id_usuario;
    this.id_restaurante = id_restaurante;
    this.nombre_restaurante = nombre_restaurante;
    this.nombre = nombre;
    this.fechainicio = fechainicio;
    this.fechafinal = fechafinal;
    this.recetas = [];
  }
}
