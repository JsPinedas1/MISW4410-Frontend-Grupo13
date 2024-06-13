import {Chef} from '../chef/chef';

export class Restaurante {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    domicilio: string;
    tipo_comida: string;
    idUsuario: number;
    redesSociales: Array<number>;
    horario: Array<{}>;
    consumo: string;
    aplicacionesMoviles: Array<number>;
    idRedSocial: number;
    idAplicacionMovil: number;
    nombreRedSocial: string;
    nombreAplicacionMovil: string;
    chefs: Chef[];

    public constructor(
        id: number,
        nombre: string,
        direccion: string,
        telefono: string,
        domicilio: string,
        tipo_comida: string,
        idUsuario: number,
        redesSociales: Array<number>,
        horario: Array<number>,
        consumo: string,
        aplicacionesMoviles: Array<number>,
        idRedSocial: number,
        idAplicacionMovil: number,
        nombreRedSocial: string,
        nombreAplicacionMovil: string,
        chefs: Chef[] = []
      ) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.domicilio = domicilio;
        this.tipo_comida = tipo_comida;
        this.idUsuario = idUsuario;
        this.redesSociales = redesSociales;
        this.horario = horario;
        this.consumo = consumo;
        this.aplicacionesMoviles = aplicacionesMoviles;
        this.idRedSocial = idRedSocial;
        this.idAplicacionMovil = idAplicacionMovil;
        this.nombreRedSocial = nombreRedSocial;
        this.nombreAplicacionMovil = nombreAplicacionMovil;
        this.chefs = chefs;
    }
}
