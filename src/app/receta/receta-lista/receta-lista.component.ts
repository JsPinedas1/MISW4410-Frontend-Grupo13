import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Receta } from '../receta';
import { Ingrediente } from 'src/app/ingrediente/ingrediente';
import { RecetaIngrediente } from 'src/app/receta-ingrediente/receta-ingrediente';
import { RecetaService } from '../receta.service';

@Component({
  selector: 'app-receta-lista',
  templateUrl: './receta-lista.component.html',
  styleUrls: ['./receta-lista.component.css']
})
export class RecetaListaComponent implements OnInit {

  recetas:Array<Receta> = []
  recetaElegida: Receta

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private recetaService: RecetaService
  ) { }

  ngOnInit() {
    this.recetaService.darRecetas().subscribe((recetas) => {
      this.recetas = recetas;
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
    });
  }

  crearReceta():void {
    this.routerPath.navigate(['/receta/crear/']);
  }

  editarReceta(idReceta: number):void {
    this.routerPath.navigate(['/receta/editar/' + idReceta]);
  }

  borrarReceta(idReceta: number):void {
    this.recetaService.borrarReceta(idReceta).subscribe((receta) => {
      this.toastr.success("Confirmation", "Registro eliminado de la lista")
      this.ngOnInit();
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
    });
  }

  prepararReceta(recetaElegida: Receta): void {
    this.recetaElegida = recetaElegida
  }

  caloriasPorcion(receta: Receta):number {
    let calorias: number = 0
    for (let i = 0; i < receta.ingredientes.length; i++) {
      calorias = calorias + receta.ingredientes[i].cantidad * receta.ingredientes[i].ingrediente.calorias
    }

    return(calorias)
  }

}
