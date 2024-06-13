import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chef } from './../chef';
import { ChefService } from './../chef.service';

@Component({
  selector: 'app-chef-lista',
  templateUrl: './chef-lista.component.html',
  styleUrls: ['./chef-lista.component.css']
})
export class ChefListaComponent implements OnInit {

  chefs:Array<Chef> = [];
  idRestaurante: string;
  message: string;
  successMessage: boolean;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private chefService: ChefService
    ) { }

  ngOnInit() {
    this.idRestaurante = this.router.snapshot.params['id'];
    this.chefService.darUsuariosPorRestaurante(parseInt(this.idRestaurante)).subscribe({
      next: (chefs) => {
        chefs = chefs.filter(chef => chef.rol == 'Chef')
        this.chefs = chefs;
        this.successMessage = true;
      },
      error: (error) => {
        this.message = 'Los chef no fueron retornados';
        this.successMessage = false;
        console.error('Ocurrió un error al consultar los chefs', error);
      }
    })
  }

  editarChef(usuario_nombre: any, usuario_id: any):void {
    this.routerPath.navigate([`/chefs/editar/${usuario_nombre}/${usuario_id}/${this.idRestaurante}`]);
  }

  crearChefs():void {
    this.routerPath.navigate(['/usuario/', this.idRestaurante]);
  }

  eliminarChef(chefId: string) {
    this.chefService.eliminarChef(chefId).subscribe(
      () => {
        this.routerPath.navigate(['/'], { skipLocationChange: true }).then(() => {
          this.routerPath.navigate([`/chefs/${chefId}`]);
        });
      },
      (error) => {
        console.error('Error al Eliminar Chef:', error);
      }
    );
  }

  trasladarChef(usuario_nombre: any, chef_id: any):void {
    this.routerPath.navigate([`/chefs/trasladar/`, this.idRestaurante, usuario_nombre, chef_id]);
  }
}
