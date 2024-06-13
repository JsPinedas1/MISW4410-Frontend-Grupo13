import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';

@Component({
  selector: 'app-ingrediente-editar',
  templateUrl: './ingrediente-editar.component.html',
  styleUrls: ['./ingrediente-editar.component.css']
})
export class IngredienteEditarComponent implements OnInit {

  ingrediente: Ingrediente
  ingredienteForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private ingredienteService: IngredienteService
  ) { }

  ngOnInit() {
    const idIngrediente = parseInt(this.router.snapshot.params['id']);
    this.ingredienteService.darIngrediente(idIngrediente).subscribe((ingrediente) => {
      this.ingrediente = ingrediente;
      this.ingredienteForm = this.formBuilder.group({
        id: [this.ingrediente.id, []],
        nombre: [this.ingrediente.nombre, [Validators.required, Validators.minLength(2)]],
        unidad: [this.ingrediente.unidad, [Validators.required, Validators.minLength(2)]],
        costo: [Number(this.ingrediente.costo), Validators.required],
        calorias: [Number(this.ingrediente.calorias), Validators.required],
        sitio: [this.ingrediente.sitio, [Validators.required, Validators.minLength(2)]]
        });
    });
  }

  editarIngrediente(ingrediente: Ingrediente): void {
    this.ingredienteService.editarIngrediente(ingrediente).subscribe((ingrediente) => {
      this.toastr.success("Confirmation", "Información editada")
      this.ingredienteForm.reset();
      this.routerPath.navigate(['/ingredientes/']);
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
    })
}

  cancelarIngrediente(): void {
    this.ingredienteForm.reset();
    this.routerPath.navigate(['/ingredientes/']);
  }


}
