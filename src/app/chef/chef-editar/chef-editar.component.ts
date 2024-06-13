import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefService } from './../chef.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-chef-editar',
  templateUrl: './chef-editar.component.html',
  styleUrls: ['./chef-editar.component.css']
})
export class ChefEditarComponent implements OnInit {
  nombreChef: string;
  usuario: string;
  idChef: string;
  idRestaurante: string;
  @ViewChild('contrasenaInput') contrasenaInput: ElementRef;
  @ViewChild('usuarioInput') usuarioInput: ElementRef;
  @ViewChild('nombreInput') nombreInput: ElementRef;
  message: string = '';
  successMessage: boolean = false;
  chefForm: FormGroup = {} as FormGroup
  idAdministrador: any


  constructor(private routerPath: Router,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private chefService: ChefService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.nombreChef = params.get('nombre');
      this.idChef = params.get('id');
      this.idRestaurante = params.get('id_restaurante');

      this.chefService.darChef(parseInt(this.idChef)).subscribe({
        next: (chef) => {
          this.usuario = chef.usuario;
        },
        error: (error) => {
          this.message = `El chef con id ${this.idChef} no fueron retornados`;
          this.successMessage = false;
          console.error('Ocurrió un error al consultar el chef', error);
        }
      })

      this.idAdministrador = sessionStorage.getItem('idUsuario')
    });
  }

  actualizarUsuario() {
    const usuario = this.usuarioInput.nativeElement.value;
    const contrasena = this.contrasenaInput.nativeElement.value;
    const nombre = this.nombreInput.nativeElement.value;

    this.chefService.modificarChef(this.idChef, nombre, usuario, contrasena).subscribe({
      next: (response) => {
        this.message = 'El usuario se editó correctamente';
        this.successMessage = true;
        this.routerPath.navigate(['restaurantes', this.idAdministrador]);
      },
      error: (error) => {
        this.message = 'El usuario no se editó correctamente';
        this.successMessage = false;
        console.error('Ocurrió un error actualizando el usuario', error);
      }
    });
  }

  cancelar() {
    this.routerPath.navigate(['restaurantes', this.idAdministrador]);
  }
}
