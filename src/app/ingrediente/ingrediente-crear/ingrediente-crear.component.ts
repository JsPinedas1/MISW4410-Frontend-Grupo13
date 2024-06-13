import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';
import { Restaurante } from 'src/app/restaurante/restaurante';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';

@Component({
  selector: 'app-ingrediente-crear',
  templateUrl: './ingrediente-crear.component.html',
  styleUrls: ['./ingrediente-crear.component.css']
})
export class IngredienteCrearComponent implements OnInit {

  ingredienteForm: FormGroup;
  listaRestaurantes: Restaurante[];
  idRestaurante = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private ingredienteService: IngredienteService,
    private restauranteService: RestauranteService
  ) { }

  ngOnInit() {
    this.ingredienteForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      unidad: ["", [Validators.required, Validators.minLength(2)]],
      costo: ["", Validators.required],
      calorias: ["", Validators.required],
      sitio: ["", [Validators.required, Validators.minLength(2)]]
    });
    this.restauranteService.darRestaurantes().subscribe((restaurantes) => {
      this.listaRestaurantes = restaurantes
    });
  }

  crearIngrediente(ingrediente: Ingrediente): void {
    ingrediente.restaurante = this.idRestaurante.value.toString();
    this.ingredienteService.crearIngrediente(ingrediente).subscribe((ingrediente) => {
      this.toastr.success("Confirmation", "Registro creado")
      this.ingredienteForm.reset();
      this.routerPath.navigate(['/ingredientes/']);
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    })

  }

  cancelarIngrediente(): void {
    this.ingredienteForm.reset();
    this.routerPath.navigate(['/ingredientes/']);
  }

}
