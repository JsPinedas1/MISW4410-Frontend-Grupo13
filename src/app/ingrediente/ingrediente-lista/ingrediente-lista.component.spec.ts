/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { IngredienteListaComponent } from './ingrediente-lista.component';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';

describe('IngredienteListaComponent', () => {
  let component: IngredienteListaComponent;
  let fixture: ComponentFixture<IngredienteListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ IngredienteListaComponent, EncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
