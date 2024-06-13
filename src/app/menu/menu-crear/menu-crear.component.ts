import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecetaService } from './../../receta/receta.service';
import { Receta } from './../../receta/receta';
import { Menu } from './../menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-crear',
  templateUrl: './menu-crear.component.html',
  styleUrls: ['./menu-crear.component.css']
})
export class MenuCrearComponent implements OnInit {

  recetaForm: FormGroup;
  recetasSubForm: FormArray;
  listaRecetas:Array<Receta> = [];
  idUsuario: string | null = sessionStorage.getItem('idUsuario');
  restauranteId: number;

  constructor(private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private recetaService: RecetaService,
    private menuService: MenuService) { }

  ngOnInit() {
    this.recetasSubForm = this.formBuilder.array([
      this.formBuilder.group({
        porcion: ["", Validators.required],
        idReceta: ["", Validators.required]
        })
    ])

    this.recetaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      fechainicio: ["", Validators.required],
      fechafinal: ["", Validators.required],
      recetas: this.recetasSubForm
    });

    this.recetaService.darRecetas().subscribe((recetas) => {
      this.listaRecetas = recetas;
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

    this.menuService.darIdRestaurante(this.idUsuario).subscribe(
      (data) => {
        this.restauranteId = data[0].id;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  adicionarReceta(): void {
    const filaNueva = this.formBuilder.group({
      porcion: ["", Validators.required],
      idReceta: ["", Validators.required]
    })

    this.recetasSubForm.push(filaNueva)
  }

  eliminarReceta(indice: number): void {
    this.recetasSubForm.removeAt(indice)
  }

  crearMenu(nuevoMenu: Menu): void {

    const fecha_inicio = nuevoMenu.fechainicio;
    const fecha_final = nuevoMenu.fechafinal;

    this.menuService.validarFechasCrear(fecha_inicio, fecha_final).subscribe(
      (response: any) => {
        if (!response.overlap) {

          this.menuService.crearMenu(nuevoMenu, this.restauranteId).subscribe(
            (menu) => {
              this.toastr.success('Confirmation', 'Registro creado');
              this.recetaForm.reset();
              this.routerPath.navigate([`/menus/${this.idUsuario}`]);
            },
            (error) => {

              this.handleError(error);
            }
          );
        } else {

          this.toastr.error('Error', 'Conflicto de fechas. Por favor seleccione otras fechas.');
        }
      },
      (error) => {

        this.handleError(error);
      }
    );
  }

  private handleError(error: any): void {
    if (error.statusText === 'UNAUTHORIZED') {
      this.toastr.error('Error', 'Su sesión ha caducado, por favor vuelva a iniciar sesión.');
    } else if (error.statusText === 'UNPROCESSABLE ENTITY') {
      this.toastr.error('Error', 'No hemos podido identificarlo, por favor vuelva a iniciar sesión.');
    } else {
      this.toastr.error('Error', 'Ha ocurrido un error. ' + error.message);
    }
  }

  cancelarMenu(): void {
    this.recetaForm.reset();
    this.routerPath.navigate([`/menus/${this.idUsuario}`]);
  }

}
