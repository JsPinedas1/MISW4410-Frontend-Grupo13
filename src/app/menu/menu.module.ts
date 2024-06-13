import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListarComponent } from './menu-listar/menu-listar.component';
import { MenuCrearComponent } from './menu-crear/menu-crear.component';
import { MenuEditarComponent } from './menu-editar/menu-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { MenuCompraComponent } from './menu-compra/menu-compra.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EncabezadoAppModule
  ],
  declarations: [MenuListarComponent, MenuCrearComponent, MenuEditarComponent, MenuCompraComponent],
  exports: [MenuListarComponent, MenuCrearComponent, MenuEditarComponent, MenuCompraComponent]
})
export class MenuModule { }
