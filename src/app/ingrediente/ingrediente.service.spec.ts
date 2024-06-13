/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { IngredienteService } from './ingrediente.service';

describe('Service: Ingrediente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IngredienteService]
    });
  });

  it('should ...', inject([IngredienteService], (service: IngredienteService) => {
    expect(service).toBeTruthy();
  }));
});
