/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Receta } from '../receta';

import { RecetaDetalleComponent } from './receta-detalle.component';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';

describe('RecetaDetalleComponent', () => {
  let component: RecetaDetalleComponent;
  let fixture: ComponentFixture<RecetaDetalleComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot() ],
      declarations: [ RecetaDetalleComponent, EncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaDetalleComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.recetaDetalle = new Receta(1, 'Receta 1', 2, 5, 'Receta descripcion 2');
    component.porcionForm = formBuilder.group({
      porcion: [Number(2), Validators.required]
      });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
