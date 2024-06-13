import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Encabezado } from './../../encabezado-app/encabezado';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';



@Component({
  selector: 'app-menu-listar',
  templateUrl: './menu-listar.component.html',
  styleUrls: ['./menu-listar.component.css']
})
export class MenuListarComponent implements OnInit {

  restauranteId: number;
  idUsuario: string | null = sessionStorage.getItem('idUsuario');
  menus: Menu[];

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private menuService: MenuService) {
   }

   ngOnInit() {
    const idUsuario = this.idUsuario;
    this.menuService.darIdRestaurante(idUsuario).subscribe(
      (data) => {
        this.restauranteId = data[0].id;
        this.darMenus();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  crearMenus():void {
    this.routerPath.navigate([`/menus/${this.idUsuario}/${this.restauranteId}`]);
  }

  darMenus() {
    this.menuService.darMenus(this.restauranteId).subscribe(
      (data) => {
        this.menus = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  borrarMenu(idMenu: number):void {
    this.menuService.borrarMenu(idMenu).subscribe((menu) => {
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

  editarMenu(idMenu: number):void {
    this.routerPath.navigate(['/menu/editar/' + idMenu]);
  }

  verCompras(idMenu: number): void {
    this.routerPath.navigate(['/menu/compras/' + idMenu]);
  }

}
