import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { Restaurante } from "../restaurante";
import { RestauranteService } from "../restaurante.service";

@Component({
  selector: "app-restaurante-crear",
  templateUrl: "./restaurante-crear.component.html",
  styleUrls: ["./restaurante-crear.component.css"],
})
export class RestauranteCrearComponent implements OnInit {

  public loading: Boolean = false;

  horarioAtencion: Array<{}> = [];
  idUsuario = sessionStorage.getItem("idUsuario");
  restauranteForm: FormGroup;

  aplicacionesMoviles = new FormControl([]);
  consumo = new FormControl("");
  domicilio = new FormControl("");
  redesSociales = new FormControl([]);
  tiposComida = new FormControl("");

  // aplicacionesMovilesLista: Array<{}> = [
  //   {nombre: "UberEats", id: 1},
  //   {nombre: "iFood", id: 2},
  //   {nombre: "Rappi", id: 3}
  // ];
  horariosAtencion: Array<{}> = [
    {nombre: "Domingo", id: 1, horaInicio: "00:00", horaFin: "23:59", check: false},
    {nombre: "Lunes", id: 2, horaInicio: "00:00", horaFin: "23:59", check: false},
    {nombre: "Martes", id: 3, horaInicio: "00:00", horaFin: "23:59", check: false},
    {nombre: "Miercoles", id: 4, horaInicio: "00:00", horaFin: "23:59", check: false},
    {nombre: "Jueves", id: 5, horaInicio: "00:00", horaFin: "23:59", check: false},
    {nombre: "Viernes", id: 6, horaInicio: "00:00", horaFin: "23:59", check: false},
    {nombre: "Sabado", id: 7, horaInicio: "00:00", horaFin: "23:59", check: false}
  ];
  // redesSocialesLista: Array<{}> = [
  //   {nombre: "Instagram", id: 1},
  //   {nombre: "Twitter", id: 2},
  //   {nombre: "TikTok", id: 3}
  // ];
  selectores: Array<{}> = [
    {nombre: "SI", id: 1},
    {nombre: "NO", id: 2}
  ];
  // tiposComidaLista: Array<{}> = [
  //   {nombre: "Asiatica", id: 1},
  //   {nombre: "Colombiana", id: 2},
  //   {nombre: "Mexicana", id: 3}
  // ];

  constructor(
    private formBuilder: FormBuilder,
    private restauranteService: RestauranteService,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.restauranteForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(3)]],
      direccion: ["", [Validators.required, Validators.minLength(5)]],
      telefono: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      tipo_comida: ["", [Validators.required, Validators.minLength(3)]],
      aplicacionesMoviles: ["", [Validators.required, Validators.minLength(3)]],
      redesSociales: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  crearRestaurante(restaurante: Restaurante): void {
    if (restaurante.telefono.toString().length < 7 || restaurante.telefono.toString().length > 10) {
      this.toastr.error("Error","El campo teléfono debe tener mínimo siete caracteres y máximo diez caracteres.");
      return;
    }
    if (this.domicilio.value.toString() !== "1" && this.domicilio.value.toString() !== "2") {
      this.toastr.error("Error","Debe elegir si cuenta con domicilio.");
      return;
    }
    // if (this.redesSociales.value.length < 1) {
    //   this.toastr.error("Error","Debe seleccionar al menos una red social.");
    //   return;
    // }
    // if (this.tiposComida.value === "") {
    //   this.toastr.error("Error","Debe seleccionar el tipo de comida.");
    //   return;
    // }
    if (this.horarioAtencion.length < 1) {
      this.toastr.error("Error","Debe seleccionar horarios.");
      return;
    }
    if (this.consumo.value.toString() !== "1" && this.consumo.value.toString() !== "2") {
      this.toastr.error("Error","Debe elegir si cuenta con consumo en el lugar.");
      return;
    }
    // if (this.aplicacionesMoviles.value.length < 1) {
    //   this.toastr.error("Error","Debe seleccionar al menos una aplicación asociada.");
    //   return;
    // }
    this.loading = true;
    restaurante.idUsuario = Number(this.idUsuario);
    restaurante.domicilio = this.domicilio.value;
    // restaurante.redesSociales = this.redesSociales.value;
    // restaurante.tipo_comida = this.tiposComida.value;
    restaurante.horario = this.horarioAtencion;
    restaurante.consumo = this.consumo.value;
    // restaurante.aplicacionesMoviles = this.aplicacionesMoviles.value;

    this.restauranteService.crearRestaurante(restaurante).subscribe((respuesta) => {
      if ("nombre" in respuesta) {
        this.toastr.success("Confirmation", "Registro creado")
        this.restauranteForm.reset();
        this.routerPath.navigate([`/restaurantes/${this.idUsuario}`]);
      } else {
        this.toastr.error("Error","Ha ocurrido un error vuelva a intentar");
      }
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.");
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.");
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message);
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  cancelarRestaurante(): void {
    this.restauranteForm.reset();
    this.routerPath.navigate([`/restaurantes/${this.idUsuario}`]);
  }

  seleccionarHorarios(evento): void {
    var itemHoraInicio = "00:00";
    var itemHoraFin = "23:00";
    if (evento.checked) {
      if (this.horarioAtencion.filter(horario => horario["id"] === evento.source.value).length === 0) {
        this.horariosAtencion.map((horario, index) => {
          if (horario["id"] === evento.source.value) {
            this.horariosAtencion[index]["check"] = true;
            itemHoraInicio = this.horariosAtencion[index]["horaInicio"]
            itemHoraFin = this.horariosAtencion[index]["horaFin"]
          }
        });
        this.horarioAtencion.push({id: evento.source.value, check: true, horaInicio: itemHoraInicio, horaFin: itemHoraFin});
      }
    } else {
      if (this.horarioAtencion.filter(horario => horario["id"] === evento.source.value).length > 0) {
        this.horarioAtencion = this.horarioAtencion.filter(function(e) {return e["id"] !== evento.source.value});
        this.horariosAtencion.map((horario, index) => {
          if (horario["id"] === evento.source.value) {
            this.horariosAtencion[index]["check"] = false;
          }
        });
      }
    }
  }

  capturarHorarios(evento, id, accion): void {
    if (this.horarioAtencion.filter(horario => horario["id"] === id).length > 0) {
      this.horarioAtencion.map((horario, index) => {
        if (horario["id"] === id) {
          if (accion === "inicio") {
            this.horarioAtencion[index]["horaInicio"] = evento.target.value;
          } else if (accion === "fin") {
            this.horarioAtencion[index]["horaFin"] = evento.target.value;
          }
        }
      });
      this.horariosAtencion.map((horario, index) => {
        if (horario["id"] === id) {
          if (accion === "inicio") {
            this.horariosAtencion[index]["horaInicio"] = evento.target.value;
          } else if (accion === "fin") {
            this.horariosAtencion[index]["horaFin"] = evento.target.value;
          }
        }
      });
    }
  }
}
