import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { RecetaListaComponent } from './receta/receta-lista/receta-lista.component';
import { RecetaCrearComponent } from './receta/receta-crear/receta-crear.component';
import { RecetaEditarComponent } from './receta/receta-editar/receta-editar.component';
import { IngredienteListaComponent } from './ingrediente/ingrediente-lista/ingrediente-lista.component';
import { IngredienteCrearComponent } from './ingrediente/ingrediente-crear/ingrediente-crear.component';
import { IngredienteEditarComponent } from './ingrediente/ingrediente-editar/ingrediente-editar.component';
import { ChefListaComponent } from './chef/chef-lista/chef-lista.component';
import { RestauranteListaComponent } from './restaurante/restaurante-lista/restaurante-lista.component';
import { ChefEditarComponent } from './chef/chef-editar/chef-editar.component';
import { RestauranteCrearComponent } from './restaurante/restaurante-crear/restaurante-crear.component';
import { ChefCrearComponent } from './chef/chef-crear/chef-crear.component';
import { ChefTrasladarComponent } from './chef/chef-trasladar/chef-trasladar.component';
import { RestauranteEditarComponent } from './restaurante/restaurante-editar/restaurante-editar.component';
import { MenuListarComponent } from './menu/menu-listar/menu-listar.component';
import { MenuCrearComponent } from './menu/menu-crear/menu-crear.component';
import { MenuEditarComponent } from './menu/menu-editar/menu-editar.component';
import { MenuCompraComponent } from './menu/menu-compra/menu-compra.component';


const routes: Routes = [
  { path: '', component: UsuarioLoginComponent, pathMatch: 'full' },
  { path: 'registro', component: UsuarioRegistroComponent,  pathMatch: 'full' },
  { path: 'recetas', component: RecetaListaComponent, pathMatch: 'full'},
  { path: 'receta/crear', component: RecetaCrearComponent, pathMatch: 'full'},
  { path: 'receta/editar/:id', component: RecetaEditarComponent, pathMatch: 'full'},
  { path: 'ingredientes', component: IngredienteListaComponent, pathMatch: 'full'},
  { path: 'ingrediente/crear', component: IngredienteCrearComponent, pathMatch: 'full'},
  { path: 'ingrediente/editar/:id', component: IngredienteEditarComponent, pathMatch: 'full'},
  { path: 'chefs/:id', component: ChefListaComponent, pathMatch: 'full'},
  { path: 'restaurantes/:id', component: RestauranteListaComponent, pathMatch: 'full'},
  { path: 'chefs/editar/:nombre/:id/:id_restaurante', component: ChefEditarComponent, pathMatch: 'full'},
  { path: 'restaurante/crear', component: RestauranteCrearComponent, pathMatch: 'full'},
  { path: 'restaurante/editar/:id', component: RestauranteEditarComponent, pathMatch: 'full'},
  { path: 'usuario/:id_restaurante', component: ChefCrearComponent, pathMatch: 'full'},
  { path: 'chefs/trasladar/:id_restaurante/:nombre/:id', component: ChefTrasladarComponent, pathMatch: 'full'},
  { path: 'menus/:id', component: MenuListarComponent, pathMatch: 'full'},
  { path: 'menus/:id/:id_restaurante', component: MenuCrearComponent, pathMatch: 'full'},
  { path: 'menu/editar/:id', component: MenuEditarComponent, pathMatch: 'full'},
  { path: 'menu/compras/:id', component: MenuCompraComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
