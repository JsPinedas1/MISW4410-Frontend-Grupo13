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

import { RecetaEditarComponent } from './receta-editar.component';
import { Receta } from '../receta';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';

describe('RecetaEditarComponent', () => {
  let component: RecetaEditarComponent;
  let fixture: ComponentFixture<RecetaEditarComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [ RecetaEditarComponent, EncabezadoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEditarComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.receta = new Receta(1, 'Receta 1', 2, 5, 'Receta descripcion 2');
    component.recetaForm = formBuilder.group({
      id: [1],
      nombre: ['Receta1', [Validators.required, Validators.minLength(2)]],
      duracion: [Number(2), Validators.required],
      porcion: [Number(5), Validators.required],
      ingredientes: formBuilder.array([]),
      preparacion: ['Receta descripcion 2', [Validators.required, Validators.minLength(2)]],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
