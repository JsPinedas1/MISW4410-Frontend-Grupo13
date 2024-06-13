/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Ingrediente } from '../ingrediente';

import { IngredienteEditarComponent } from './ingrediente-editar.component';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';

describe('IngredienteEditarComponent', () => {
  let component: IngredienteEditarComponent;
  let fixture: ComponentFixture<IngredienteEditarComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [ IngredienteEditarComponent, EncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteEditarComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.ingrediente = new Ingrediente(1, 'Ingrediente 1', '2', 1000, 2500, 'Sitio 1');
    component.ingredienteForm = formBuilder.group({
      id: [1, []],
      nombre: ['Ingrediente 1', [Validators.required, Validators.minLength(2)]],
      unidad: ['2', [Validators.required, Validators.minLength(2)]],
      costo: [Number(1000), Validators.required],
      calorias: [Number(2500), Validators.required],
      sitio: ['Sitio 1', [Validators.required, Validators.minLength(2)]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(1).toBe(1);
  });
});
