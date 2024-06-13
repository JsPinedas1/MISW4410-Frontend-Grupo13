export class Chef {
  nombre: string;
  usuario: string;
  id: string;
  rol: string;
  restaurante_id: number;
  contrasena: string;

  public constructor(nombre: string, usuario: string, id: string, rol: string, restaurante_id: number = null, contrasena: string = null) {
    this.nombre = nombre;
    this.usuario = usuario;
    this.id = id;
    this.rol = rol;
    this.restaurante_id = restaurante_id;
    this.contrasena = contrasena;
  }

}