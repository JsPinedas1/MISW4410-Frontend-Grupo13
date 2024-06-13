export class Ingrediente {
  id: number;
  nombre: string;
  unidad: string;
  costo: number;
  calorias: number;
  sitio: string;
  restaurante: string;

  public constructor(id: number, nombre: string, unidad: string, costo: number,
    calorias: number, sitio: string, restaurante: string) {
    this.id = id;
    this.nombre = nombre;
    this.unidad = unidad;
    this.costo = costo;
    this.calorias = calorias;
    this.sitio = sitio;
    this.restaurante = restaurante;
  }

}
