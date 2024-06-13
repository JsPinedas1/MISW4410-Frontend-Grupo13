import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Receta } from '../receta';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.component.html',
  styleUrls: ['./receta-detalle.component.css']
})
export class RecetaDetalleComponent implements OnInit {

  @Input() recetaDetalle: Receta
  factor: number
  porcionForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.factor = 1
    this.porcionForm = this.formBuilder.group({
      porcion: [Number(this.recetaDetalle.porcion), Validators.required]
      });
    this.recetaDetalle.preparacion = this.recetaDetalle.preparacion.replace(/\n/g,'<br/>')
  }

  actualizarFactor(porcion: number):void {
    this.factor=porcion/this.recetaDetalle.porcion
  }

  costoPreparacion():number {
    let costo: number = 0
    for (let i = 0; i < this.recetaDetalle.ingredientes.length; i++) {
      costo = costo + this.recetaDetalle.ingredientes[i].ingrediente.costo * this.factor * this.recetaDetalle.ingredientes[i].cantidad
    }

    return(costo)
  }

  caloriasPorcion():number {
    let calorias: number = 0
    for (let i = 0; i < this.recetaDetalle.ingredientes.length; i++) {
      calorias = calorias + this.recetaDetalle.ingredientes[i].cantidad * this.recetaDetalle.ingredientes[i].ingrediente.calorias
    }

    return(calorias)
  }

}
