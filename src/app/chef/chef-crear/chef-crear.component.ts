import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefService } from './../chef.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-crear-chef',
  templateUrl: './chef-crear.component.html',
  styleUrls: ['./chef-crear.component.css']
})
export class ChefCrearComponent implements OnInit {
  idRestaurante: string;
  nombreChef: string;
  idChef: string;
  @ViewChild('contrasenaInput') contrasenaInput: ElementRef;
  @ViewChild('usuarioInput') usuarioInput: ElementRef;
  @ViewChild('nombreInput') nombreInput: ElementRef;
  message: string = '';
  successMessage: boolean = false;
  administradorId: any;

  constructor(private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private chefService: ChefService) { }
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.idRestaurante = params.get('id_restaurante');
    });
    this.administradorId = sessionStorage.getItem("idUsuario");
  }
  crearChef() {
    const nombre = this.nombreInput.nativeElement.value;
    const usuario = this.usuarioInput.nativeElement.value;
    const contrasena = this.contrasenaInput.nativeElement.value;
    this.chefService.crearChef(nombre, usuario, contrasena, this.idRestaurante).subscribe({
      next: (response) => {
        this.message = 'El usuario se guardo correctamente';
        this.successMessage = true;
        this.routerPath.navigate(['restaurantes', this.administradorId]);
      },
      error: (error) => {
        this.message = 'El usuario no se guardo correctamente';
        this.successMessage = false;
        console.error('Ocurrió un error guardando el usuario', error);
      }
    });
  }
  cancelar() {
    this.routerPath.navigate(['restaurantes', this.administradorId]);
  }
}
