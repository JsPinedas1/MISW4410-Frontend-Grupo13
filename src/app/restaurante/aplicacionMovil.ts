export class AplicacionMovil {
  id: number;
  nombre: string;
  restaurante: number;

  public constructor(
      id: number,
      nombre: string,
      restaurante: number,
    ) {
      this.id = id;
      this.nombre = nombre;
      this.restaurante = restaurante;
  }
}
