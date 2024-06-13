export class Horario {
  id: number;
  dia_apertura: string;
  hora_inicio: string;
  hora_fin: string;
  restaurante: number;

  public constructor(
      id: number,
      dia_apertura: string,
      hora_inicio: string,
      hora_fin: string,
      restaurante: number,
    ) {
      this.id = id;
      this.dia_apertura = dia_apertura;
      this.hora_inicio = hora_inicio;
      this.hora_fin = hora_fin;
      this.restaurante = restaurante;
  }
}
