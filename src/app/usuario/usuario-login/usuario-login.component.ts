import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})

export class UsuarioLoginComponent implements OnInit {

  error: string = "";
  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('decodedToken', '');
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('idUsuario', '');
  }

  loginUsuario(usuario: string, contrasena: string) {
    this.error = ""

    this.usuarioService.login(usuario, contrasena)
      .subscribe({
        next: datos_login => {
          sessionStorage.setItem('decodedToken', this.helper.decodeToken(datos_login.token));
          sessionStorage.setItem('token', datos_login.token);
          sessionStorage.setItem('idUsuario', datos_login.id);
          sessionStorage.setItem('rolUsuario', datos_login.rol);
          this.toastrService.success("Login ok", "Información", {closeButton: true});
          if(datos_login.rol == 'Administrador') {
            this.router.navigate([`/restaurantes/${datos_login.id}`])
          } else {
            this.router.navigate([`/recetas`])
          }
        },
        error: error => {
          this.error = "Usuario o contraseña incorrectos";
        }
      })
  }
}
