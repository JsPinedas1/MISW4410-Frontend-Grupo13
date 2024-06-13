import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

// import { AplicacionMovil } from "../aplicacionMovil";
import { Horario } from "../horario";
// import { RedSocial } from "../redSocial";
import { Restaurante } from "../restaurante";
import { RestauranteService } from "../restaurante.service";

@Component({
  selector: "app-restaurante-editar",
  templateUrl: "./restaurante-editar.component.html",
  styleUrls: ["./restaurante-editar.component.css"]
})
export class RestauranteEditarComponent implements OnInit {

  public loading: Boolean = false;

  // aplicacionesMovilesRespuestaLista: AplicacionMovil[];
  horarioAtencion: Array<{}> = [];
  horariosRespuestaLista: Horario[];
  idRestaurante: Number;
  idUsuario = sessionStorage.getItem("idUsuario");
  // redesSocialesRespuestaLista: RedSocial[];
  restauranteRespuestaObjeto: Restaurante;
  // valortipoComida: Number = 0;

  restauranteForm: FormGroup = {} as FormGroup;
  aplicacionesMoviles = new FormControl([]);
  consumo = new FormControl(0);
  domicilio = new FormControl(0);
  redesSociales = new FormControl([]);
  // tiposComida = new FormControl("");

  // aplicacionesMovilesLista: Array<{}> = [
  //   {nombre: "UberEats", id: 1, check: false},
  //   {nombre: "iFood", id: 2, check: false},
  //   {nombre: "Rappi", id: 3, check: false}
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
  //   {nombre: "Instagram", id: 1, check: false},
  //   {nombre: "Twitter", id: 2, check: false},
  //   {nombre: "TikTok", id: 3, check: false}
  // ];
  selectoresConsumo: Array<{}> = [
    {nombre: "SI", id: 1, check: false},
    {nombre: "NO", id: 2, check: false}
  ];
  selectoresDomicilio: Array<{}> = [
    {nombre: "SI", id: 1, check: false},
    {nombre: "NO", id: 2, check: false}
  ];
  // tiposComidaLista: Array<{}> = [
  //   {nombre: "Asiatica", id: 1, check: false},
  //   {nombre: "Colombiana", id: 2, check: false},
  //   {nombre: "Mexicana", id: 3, check: false}
  // ];

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private restauranteService: RestauranteService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loading = true;
    const idRestaurante =  parseInt(this.router.snapshot.params["id"]);
    this.restauranteService.darRestaurante(idRestaurante).subscribe((restauranteRespuesta) => {
      this.restauranteRespuestaObjeto = restauranteRespuesta;
      this.consumo.setValue(Number(restauranteRespuesta.consumo));
      this.domicilio.setValue(Number(restauranteRespuesta.domicilio));
      this.idRestaurante = restauranteRespuesta.id;
      // this.valortipoComida = Number(restauranteRespuesta.tipo_comida);
      this.selectoresConsumo.map((selector, index) => {
        if (Number(selector["id"]) === Number(restauranteRespuesta.consumo)) {
          this.selectoresConsumo[index]["check"] = true;
        }
      });
      this.selectoresDomicilio.map((selector, index) => {
        if (Number(selector["id"]) === Number(restauranteRespuesta.domicilio)) {
          this.selectoresDomicilio[index]["check"] = true;
        }
      });
      // this.restauranteService.consultarRedesSocialesRestaurante(idRestaurante).subscribe((redesSocialesRespuesta) => {
      //   this.redesSocialesRespuestaLista = redesSocialesRespuesta;
      //   let listaRedesSociales: any[] = [];
      //   this.redesSocialesLista.map((redSocialItem) => {
      //     redesSocialesRespuesta.map((redSocialRespuestaItem) => {
      //       if (Number(redSocialItem["id"]) === Number(redSocialRespuestaItem.nombre)) {
      //         listaRedesSociales.push(redSocialItem);
      //       }
      //     });
      //   });
      //   this.redesSociales.setValue(listaRedesSociales);
      // });
      // this.restauranteService.consultarAplicacionesMovilesRestaurante(idRestaurante).subscribe((aplicacionesMovilesRespuesta) => {
      //   this.aplicacionesMovilesRespuestaLista = aplicacionesMovilesRespuesta;
      //   let listaAplicacionesMoviles: any[] = [];
      //   this.aplicacionesMovilesLista.map((aplicacionMovilItem) => {
      //     aplicacionesMovilesRespuesta.map((aplicacionMovilRespuestaItem) => {
      //       if (Number(aplicacionMovilItem["id"]) === Number(aplicacionMovilRespuestaItem.nombre)) {
      //         listaAplicacionesMoviles.push(aplicacionMovilItem);
      //       }
      //     });
      //   });
      //   this.aplicacionesMoviles.setValue(listaAplicacionesMoviles);
      // });
      this.restauranteService.consultarHorarioRestaurante(idRestaurante).subscribe((horarioRespuesta) => {
        this.horariosRespuestaLista = horarioRespuesta;
        this.horariosAtencion.map((horariosAtencionItem, index) => {
          horarioRespuesta.map((horarioRespuestaItem) => {
            if (Number(horariosAtencionItem["id"]) === Number(horarioRespuestaItem.dia_apertura)) {
              this.horariosAtencion[index]["check"] = true;
              this.horariosAtencion[index]["horaInicio"] = horarioRespuestaItem.hora_inicio.toString();
              this.horariosAtencion[index]["horaFin"] = horarioRespuestaItem.hora_fin.toString();
              this.horarioAtencion.push({id: Number(horarioRespuestaItem.dia_apertura), check: true, horaInicio: horarioRespuestaItem.hora_inicio, horaFin: horarioRespuestaItem.hora_fin});
            }
          });
        });
      });
      this.restauranteForm = this.formBuilder.group({
        nombre: [this.restauranteRespuestaObjeto.nombre, [Validators.required, Validators.minLength(3)]],
        direccion: [this.restauranteRespuestaObjeto.direccion, [Validators.required, Validators.minLength(5)]],
        telefono: [this.restauranteRespuestaObjeto.telefono, [Validators.required, Validators.minLength(7)]],
        tipo_comida: [this.restauranteRespuestaObjeto.tipo_comida, [Validators.required, Validators.minLength(3)]],
        aplicacionesMoviles: [this.restauranteRespuestaObjeto.nombreAplicacionMovil, [Validators.required, Validators.minLength(3)]],
        redesSociales: [this.restauranteRespuestaObjeto.nombreRedSocial, [Validators.required, Validators.minLength(3)]],
      });
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

  guardarRestaurante(restaurante: Restaurante): void {
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
    restaurante.id = Number(this.idRestaurante);
    restaurante.idUsuario = Number(this.idUsuario);
    restaurante.domicilio = this.domicilio.value.toString();
    // restaurante.redesSociales = this.redesSociales.value;
    // restaurante.tipo_comida = this.tiposComida.value;
    restaurante.horario = this.horarioAtencion;
    restaurante.consumo = this.consumo.value.toString();
    restaurante.idRedSocial = Number(this.restauranteRespuestaObjeto.idRedSocial);
    restaurante.idAplicacionMovil = Number(this.restauranteRespuestaObjeto.idAplicacionMovil);
    // restaurante.aplicacionesMoviles = this.aplicacionesMoviles.value;

    this.restauranteService.editarRestaurante(restaurante).subscribe((respuesta) => {
      if ("nombre" in respuesta) {
        this.toastr.success("Confirmation", "Registro editado")
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

  cancelarRestaurante(): void {
    this.restauranteForm.reset();
    this.routerPath.navigate([`/restaurantes/${this.idUsuario}`]);
  }

}
