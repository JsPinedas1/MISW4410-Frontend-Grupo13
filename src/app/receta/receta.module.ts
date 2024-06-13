import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { RecetaListaComponent } from './receta-lista/receta-lista.component';
import { RecetaDetalleComponent } from './receta-detalle/receta-detalle.component';
import { RecetaCrearComponent } from './receta-crear/receta-crear.component';
import { RecetaEditarComponent } from './receta-editar/receta-editar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    RecetaListaComponent,
    RecetaDetalleComponent,
    RecetaCrearComponent,
    RecetaEditarComponent
  ],
  exports: [
    RecetaListaComponent,
    RecetaDetalleComponent,
    RecetaCrearComponent,
    RecetaEditarComponent
  ]
})
export class RecetaModule { }
