export class Encabezado {
  nombre: string;
  usuario: string;
  id: string;
  rol: string;

  public constructor(nombre: string, usuario: string, id: string, rol: string) {
    this.nombre = nombre;
    this.usuario = usuario;
    this.id = id;
    this.rol = rol
  }

}
