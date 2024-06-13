import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Encabezado } from './../encabezado';
import { EncabezadoService } from './../encabezado.service'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  idUsuario: string | null = sessionStorage.getItem('idUsuario');
  nombre: string;
  rol: string;
  usuario: string;
  message: string;
  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private encabezadoService: EncabezadoService) { }

    ngOnInit(): void {
      // Assign the user ID to idUsuario (replace with your logic)
    const idUsuario = this.idUsuario; // Example user ID

    this.encabezadoService.darRolUsuario(idUsuario).subscribe(
      (data: Encabezado) => {
        // Assign the data to component variables
        this.nombre = data.nombre;
        this.rol = data.rol;
        this.usuario = data.usuario;
      },
      (error) => {
        // Handle any errors here
        console.error('Error:', error);
      }
    );
    }

}
