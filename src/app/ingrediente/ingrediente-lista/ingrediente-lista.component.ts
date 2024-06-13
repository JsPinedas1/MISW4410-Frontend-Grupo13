import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingrediente } from './../ingrediente';
import { IngredienteService } from './../ingrediente.service';

@Component({
  selector: 'app-ingrediente-lista',
  templateUrl: './ingrediente-lista.component.html',
  styleUrls: ['./ingrediente-lista.component.css']
})
export class IngredienteListaComponent implements OnInit {

  ingredientes:Array<Ingrediente> = []

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private ingredienteService: IngredienteService
  ) { }

  ngOnInit() {
    this.ingredienteService.darIngredientes().subscribe((ingredientes) => {
      this.ingredientes = ingredientes;
    })
  }

  crearIngrediente():void {
    this.routerPath.navigate(['/ingrediente/crear/']);
  }

  editarIngrediente(idIngrediente: number):void {
    this.routerPath.navigate(['/ingrediente/editar/' + idIngrediente]);
  }

  borrarIngrediente(idIngrediente: number):void {
    this.ingredienteService.borrarIngrediente(idIngrediente).subscribe((ingrediente) => {
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
}
