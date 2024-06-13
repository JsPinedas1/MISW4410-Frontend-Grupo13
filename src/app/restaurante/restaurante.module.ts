import { CommonModule, NgFor } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { NgModule } from "@angular/core";

import { EncabezadoAppModule } from "../encabezado-app/encabezado-app.module";
import { RestauranteCrearComponent } from "./restaurante-crear/restaurante-crear.component";
import { RestauranteEditarComponent } from "./restaurante-editar/restaurante-editar.component";
import { RestauranteListaComponent } from "./restaurante-lista/restaurante-lista.component";

@NgModule({
  imports: [
    CommonModule,
    EncabezadoAppModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    NgFor,
  ],
  declarations: [
    RestauranteListaComponent,
    RestauranteCrearComponent,
    RestauranteEditarComponent
  ],
  exports: [
    RestauranteListaComponent,
    RestauranteCrearComponent,
    RestauranteEditarComponent
  ]
})
export class RestauranteModule { }
