import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Receta } from '../receta';
import { RecetaService } from '../receta.service';
import { Ingrediente } from 'src/app/ingrediente/ingrediente';
import { IngredienteService } from 'src/app/ingrediente/ingrediente.service';

@Component({
  selector: 'app-receta-crear',
  templateUrl: './receta-crear.component.html',
  styleUrls: ['./receta-crear.component.css']
})
export class RecetaCrearComponent implements OnInit {

  recetaForm: FormGroup;
  ingredientesSubForm: FormArray;
  listaIngredientes: Ingrediente[]

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService
  ) { }

  ngOnInit() {
    this.ingredientesSubForm = this.formBuilder.array([
      this.formBuilder.group({
        id:[""],
        cantidad: ["", Validators.required],
        idIngrediente: ["", Validators.required]
        })
    ])
    this.recetaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      duracion: ["", Validators.required],
      porcion: ["", Validators.required],
      ingredientes: this.ingredientesSubForm,
      preparacion: ["", [Validators.required, Validators.minLength(2)]]
    });

    this.ingredienteService.darIngredientes().subscribe((ingredientes) => {
      console.log(ingredientes);
      this.listaIngredientes = ingredientes
    });
  }

  crearReceta(nuevaReceta: Receta): void {
    this.recetaService.crearReceta(nuevaReceta).subscribe((receta) => {
      this.toastr.success("Confirmation", "Registro creado")
      this.recetaForm.reset();
      this.routerPath.navigate(['/recetas/']);
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

  cancelarReceta(): void {
    this.recetaForm.reset();
    this.routerPath.navigate(['/recetas/']);
  }

  adicionarIngrediente(): void {
    const filaNueva = this.formBuilder.group({
      id: [""],
      cantidad: ["", Validators.required],
      idIngrediente: ["", Validators.required]
    })

    this.ingredientesSubForm.push(filaNueva)
  }

  eliminarIngrediente(indice: number): void {
    this.ingredientesSubForm.removeAt(indice)
  }
}
