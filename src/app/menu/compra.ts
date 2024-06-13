export class Compra {

    cantidad: number;
    ingrediente: string;
    precio: number;
    recetas: string[];
    sitio: string;
  
    public constructor(cantidad: number, ingrediente: string, precio: number, recetas: string[], sitio: string) {
      this.cantidad = cantidad;
      this.ingrediente = ingrediente;
      this.precio = precio;
      this.recetas = recetas;
      this.sitio = sitio;
    }
  }