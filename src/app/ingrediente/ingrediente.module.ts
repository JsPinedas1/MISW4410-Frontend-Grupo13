import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { IngredienteListaComponent } from './ingrediente-lista/ingrediente-lista.component';
import { IngredienteCrearComponent } from './ingrediente-crear/ingrediente-crear.component';
import { IngredienteEditarComponent } from './ingrediente-editar/ingrediente-editar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [
    IngredienteListaComponent,
    IngredienteCrearComponent,
    IngredienteEditarComponent
  ],
  exports: [
    IngredienteListaComponent,
    IngredienteCrearComponent,
    IngredienteEditarComponent
  ]
})
export class IngredienteModule { }
