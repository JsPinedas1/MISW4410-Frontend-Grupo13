import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Receta } from '../receta';
import { RecetaService } from '../receta.service';
import { IngredienteService } from 'src/app/ingrediente/ingrediente.service';

import { Ingrediente } from 'src/app/ingrediente/ingrediente';
import { RecetaIngrediente } from 'src/app/receta-ingrediente/receta-ingrediente';

@Component({
  selector: 'app-receta-editar',
  templateUrl: './receta-editar.component.html',
  styleUrls: ['./receta-editar.component.css']
})
export class RecetaEditarComponent implements OnInit {

  receta: Receta
  recetaForm: FormGroup = {} as FormGroup
  ingredientesSubForm: FormArray  = {} as FormArray
  listaIngredientes: Ingrediente[]

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService
  ) { }

  ngOnInit() {

    const idReceta = parseInt(this.router.snapshot.params['id']);

    //Primero cargo los ingredientes
    this.ingredienteService.darIngredientes().subscribe((ingredientes) => {
      this.listaIngredientes = ingredientes

      //Cargo la receta cuando ya tengo los ingredientes
      this.recetaService.darReceta(idReceta).subscribe((receta) => {
        this.receta = receta
        this.ingredientesSubForm = this.formBuilder.array([])

        //Primero diligencio la sub forma para no tener problemas con el bind
        for(var recetaIngrediente of this.receta.ingredientes) {
          this.adicionarElemento(recetaIngrediente.id, recetaIngrediente.ingrediente.id, recetaIngrediente.cantidad)
        }

        this.recetaForm = this.formBuilder.group({
          id: [this.receta.id],
          nombre: [this.receta.nombre, [Validators.required, Validators.minLength(2)]],
          duracion: [Number(this.receta.duracion), Validators.required],
          porcion: [Number(this.receta.porcion), Validators.required],
          ingredientes: this.ingredientesSubForm,
          preparacion: [this.receta.preparacion, [Validators.required, Validators.minLength(2)]]
        });


      })
    });

  }

  editarReceta(cambioReceta: Receta): void {
    this.recetaService.editarReceta(cambioReceta).subscribe((receta) => {
      this.toastr.success("Confirmation", "Registro editado")
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

  adicionarElemento(id:number, idIngrediente:number, cantidad: number): void {
    const filaNueva = this.formBuilder.group({
      id: [id, Validators.required],
      cantidad: [Number(cantidad), Validators.required],
      idIngrediente: [idIngrediente, Validators.required]
    })
    this.ingredientesSubForm.push(filaNueva)
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
