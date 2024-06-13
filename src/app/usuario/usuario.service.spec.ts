/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { UsuarioService } from './usuario.service';

describe('Service: Usuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
  });

  it('should be created', inject([UsuarioService], (service: UsuarioService) => {
    expect(service).toBeTruthy();
  }));

  it('should have login method', inject([UsuarioService], (service: UsuarioService) => {
    expect(service.login).toBeTruthy();
  }));

  it('should have registro method', inject([UsuarioService], (service: UsuarioService) => {
    expect(service.registro).toBeTruthy();
  }));
});
