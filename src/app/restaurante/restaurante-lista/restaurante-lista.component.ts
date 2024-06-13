import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../restaurante';
import { RestauranteService } from '../restaurante.service';
import { forkJoin } from 'rxjs';
import { Encabezado } from './../../encabezado-app/encabezado';
import { ChefService } from 'src/app/chef/chef.service';
import { Chef } from 'src/app/chef/chef'
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-restaurante-lista',
  templateUrl: './restaurante-lista.component.html',
  styleUrls: ['./restaurante-lista.component.css']
})
export class RestauranteListaComponent implements OnInit {

  restaurantes:Array<Restaurante> = []
  recetaElegida: Restaurante
  idUsuario: string | null = sessionStorage.getItem('idUsuario');
  nombre: string;
  rol: string | null = sessionStorage.getItem('rolUsuario');
  usuario: string;
  chefsSubForm: FormArray;
  chefForm: FormGroup;
  message: string;
  successMessage: boolean = false;
  administradorId: any;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private restauranteService: RestauranteService,
    private chefService: ChefService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.restauranteService.darRestaurantes().subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        if(this.restaurantes.length > 0) {
          this.buscarUsuariosPorRestaurantes();
          this.construirFormulario();
        }
      },
      error: error => {
        if (error.statusText === "UNAUTHORIZED") {
          this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
        }
        else if (error.statusText === "UNPROCESSABLE ENTITY") {
          this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        }
        else {
          this.toastr.error("Error","Ha ocurrido un error. " + error.message)
        }
      }
    });
    this.administradorId = sessionStorage.getItem("idUsuario");
  }

  construirFormulario() {
    this.chefsSubForm = this.formBuilder.array([
      this.formBuilder.group({
        nombre:["", Validators.required],
        usuario: ["", Validators.required],
        contrasena: ["", Validators.required]
      })
    ])
    this.chefForm = this.formBuilder.group({
      chefs: this.chefsSubForm
    });
  }

  asociarChefsPorRestaurante(usuarios: Chef[]) {
    const chefs = usuarios.filter((chef: Chef) => chef.rol == "Chef");
    this.restaurantes = this.restaurantes.map(restaurante => {
      const chefs_por_restaurante = chefs.filter(chef => chef.restaurante_id == restaurante.id);
      if(chefs_por_restaurante) {
        restaurante.chefs = chefs_por_restaurante;
      }
      return restaurante
    });
  }

  controlarExcepcionesAlBuscarUsuariosPorRestaurantes(error: any) {
    if (error.statusText === "UNAUTHORIZED") {
      this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
    }
    else if (error.statusText === "UNPROCESSABLE ENTITY") {
      this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.toastr.error("Error","Ha ocurrido un error. " + error.message)
    }
  }

  buscarUsuariosPorRestaurantes(){
    const restaurante_ids = this.restaurantes.map<number>(restaurante => restaurante.id);

    this.chefService.darUsuariosPorRestaurante(restaurante_ids).subscribe({
      next: (usuarios: Chef[]) => this.asociarChefsPorRestaurante(usuarios),
      error: (error: any) => this.controlarExcepcionesAlBuscarUsuariosPorRestaurantes(error)
    })
  }

  crearRestaurante():void {
    this.routerPath.navigate(['/restaurante/crear/']);
  }

  verChefs(restaurante_id: any):void {
    this.routerPath.navigate([`/chefs/${restaurante_id}`]);
  }

  verMenus():void {
    this.routerPath.navigate([`/menus/${this.idUsuario}`]);
  }

  editarRestaurante(idRestaurante: number):void {
    this.routerPath.navigate(['/restaurante/editar/' + idRestaurante]);
  }

  eliminarRestaurante(restauranteId: number) {
    this.restauranteService.eliminarRestaurante(restauranteId).subscribe({
      next: () => {
        this.routerPath.navigate(['/'], { skipLocationChange: true }).then(() => {
          this.routerPath.navigate([`restaurantes/:${restauranteId}`]);
        });
      },
      error: (error) => {
        this.toastr.error("No se puede eliminar el restaurante porque hay chefs asociados.");
        console.error('Error deleting restaurant:', error);
      }
    });
  }

  editarChef(usuarioNombre: any, usuarioId: any, restauranteId: any):void {
    this.routerPath.navigate([`/chefs/editar/${usuarioNombre}/${usuarioId}/${restauranteId}`]);
  }

  eliminarChef(chefId: string) {
    this.chefService.eliminarChef(chefId).subscribe({
      next: () => {
        this.routerPath.navigate(['/'], { skipLocationChange: true }).then(() => {
          const idAdmistrador = sessionStorage.getItem('idUsuario')
          this.routerPath.navigate([`/restaurantes/${idAdmistrador}`]);
        });
      },
      error: (error) => {
        console.error('Error al Eliminar Chef:', error);
      }
    });
  }

  trasladarChef(restauranteId: any, usuarioNombre: any, chef_id: any):void {
    this.routerPath.navigate([`/chefs/trasladar/`, restauranteId, usuarioNombre, chef_id]);
  }

  crearChef(restauranteId: any):void {
    this.routerPath.navigate(['/usuario/', restauranteId]);
  }

  crearChefPorPrimeraVez(restauranteId: any, lineaForm: any):void {
    const nombre = lineaForm.nombre;
    const usuario = lineaForm.usuario;
    const contrasena = lineaForm.contrasena;
    this.chefService.crearChef(nombre, usuario, contrasena, restauranteId).subscribe({
      next: (response) => {
        this.message = 'El usuario se guardo correctamente';
        this.successMessage = true;
        this.routerPath.navigate(['/'], { skipLocationChange: true }).then(() => {
          this.routerPath.navigate([`/restaurantes/${this.administradorId}`]);
        });
      },
      error: (error) => {
        this.message = 'El usuario no se guardo correctamente';
        this.successMessage = false;
        console.error('Ocurrió un error guardando el usuario', error);
      }
    });
  }
}
