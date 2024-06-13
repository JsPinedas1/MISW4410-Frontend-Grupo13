/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'; 
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { ChefEditarComponent } from './chef-editar.component';
import { Chef } from '../chef';
import { EncabezadoComponent } from '../../encabezado-app/encabezado/encabezado.component';

describe('ChefEditarComponent', () => {
  let component: ChefEditarComponent;
  let fixture: ComponentFixture<ChefEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [ ChefEditarComponent, EncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefEditarComponent);
    component = fixture.componentInstance;
    component.idChef = '1'
    component.nombreChef = 'Chef 1'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
