import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefListaComponent } from './chef-lista/chef-lista.component';
import { ChefEditarComponent } from './chef-editar/chef-editar.component';
import { ChefTrasladarComponent } from './chef-trasladar/chef-trasladar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { ChefCrearComponent } from './chef-crear/chef-crear.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EncabezadoAppModule
  ],
  declarations: [ChefListaComponent, ChefEditarComponent, ChefCrearComponent, ChefTrasladarComponent],
  exports: [ ChefListaComponent, ChefEditarComponent, ChefCrearComponent , ChefTrasladarComponent]
})
export class ChefModule { }
