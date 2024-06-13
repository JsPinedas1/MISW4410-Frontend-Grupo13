import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../../restaurante/restaurante';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';
import { ChefService } from 'src/app/chef/chef.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chef-trasladar',
  templateUrl: './chef-trasladar.component.html',
  styleUrls: ['./chef-trasladar.component.css']
})
export class ChefTrasladarComponent implements OnInit {

  trasladarChefForm: FormGroup;
  restaurantes: Array<Restaurante> = [];
  nombreChef: string;
  idRestaurante: string;
  chefId: string;
  administradorId: string;
  message: string;
  successMessage: boolean;
  @ViewChild('usuarioInput') usuarioInput: ElementRef;

  constructor(private routerPath: Router,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private restauranteService: RestauranteService,
    private chefService: ChefService
    ) {
    }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.nombreChef = params.get('nombre');
      this.idRestaurante = params.get('id_restaurante');
      this.chefId = params.get('id');
      this.administradorId = sessionStorage.getItem('idUsuario');

      this.restauranteService.darRestaurantes().subscribe((restaurantes) => {
        const restaurantes_filtrados = restaurantes.filter((restaurante) => restaurante.id != parseInt(this.idRestaurante))
        this.restaurantes = restaurantes_filtrados;
      });
    });

    this.trasladarChefForm = this.formBuilder.group({
      seleccionarRestaurante: ["", Validators.required]
    });
  }

  trasladarChef(trasladarChef: any):void {
    this.chefService.trasladarChef(this.chefId, trasladarChef.seleccionarRestaurante).subscribe({
      next: (response) => {
        this.message = 'Se cambio de restaurante';
        this.successMessage = true;
        this.routerPath.navigate(['restaurantes', this.administradorId]);
      },
      error: (error) => {
        this.message = 'El restaurante no se cambió correctamente';
        this.successMessage = false;
        console.error('Ocurrió un error cambiando el restaurante', error);
      }
    })
  }

  cancelarTrasladoChef():void {
    this.routerPath.navigate(['restaurantes', this.administradorId]);
  }

}
