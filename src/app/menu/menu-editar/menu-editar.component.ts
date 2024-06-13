import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecetaService } from './../../receta/receta.service';
import { Receta } from './../../receta/receta';
import { Menu } from './../menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-editar',
  templateUrl: './menu-editar.component.html',
  styleUrls: ['./menu-editar.component.css']
})
export class MenuEditarComponent implements OnInit {

  recetaForm: FormGroup;
  recetasSubForm: FormArray;
  listaRecetas: Array<Receta> = [];
  idUsuario: string | null = sessionStorage.getItem('idUsuario');
  menu: any;
  recetas: any[];
  idMenu: number;


  constructor(private formBuilder: FormBuilder,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private recetaService: RecetaService,
    private menuService: MenuService) {

      this.recetasSubForm = this.formBuilder.array([]);

      this.recetaForm = this.formBuilder.group({
        id: [],
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        fechainicio: ['', Validators.required],
        fechafinal: ['', Validators.required],
        recetas: this.recetasSubForm,
      });



    }

    ngOnInit() {
      this.idMenu = parseInt(this.router.snapshot.params['id']);
      this.menuService.darRecetas(this.idMenu).subscribe((data: any) => {
        if (data && data.recetas) {
          this.recetas = data.recetas;
          this.menu = data;

          for (const recetaMenu of this.recetas) {
            this.adicionarElemento(
              recetaMenu.id,
              recetaMenu.nombre,
              recetaMenu.porcion
            );
          }

          this.recetaForm.patchValue({
            id: this.idMenu,
            nombre: data.nombre,
            fechainicio: data.fechainicio,
            fechafinal: data.fechafinal,
            recetas: this.recetasSubForm,

          });
        } else {
          console.error('Invalid JSON structure');
        }
      });
    }

  editarMenu(cambioMenu: Menu, idMenu): void {

    const fecha_inicio = cambioMenu.fechainicio;
    const fecha_final = cambioMenu.fechafinal;

    this.menuService.validarFechasEditar(fecha_inicio, fecha_final, this.idMenu).subscribe(
      (response: any) => {
        if (!response.overlap) {
          this.menuService.editarMenu(cambioMenu, idMenu).subscribe((menu) => {
            this.toastr.success("Confirmation", "Registro editado")
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

  adicionarElemento(id: number, nombreReceta: string, porcion: number): void {
    const recetaFormGroup = this.formBuilder.group({
      id: [id, Validators.required],
      idReceta: [nombreReceta, Validators.required],
      porcion: [porcion, Validators.required]
    });

    this.recetasSubForm.push(recetaFormGroup);
  }

  cancelarMenu(): void {
    this.recetaForm.reset();
    this.routerPath.navigate([`/menus/${this.idUsuario}`]);
  }

  eliminarReceta(indice: number): void {
    this.recetasSubForm.removeAt(indice)
  }

  adicionarReceta(): void {
    const filaNueva = this.formBuilder.group({
      porcion: ["", Validators.required],
      idReceta: ["", Validators.required]
    })

    this.recetasSubForm.push(filaNueva)
  }

}
