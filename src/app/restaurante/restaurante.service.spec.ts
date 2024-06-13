/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { RestauranteService } from './restaurante.service';

describe('Service: Restaurante', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestauranteService]
    });
  });

  it('should be created the Restaurante Service', inject([RestauranteService], (service: RestauranteService) => {
    expect(service).toBeTruthy();
  }));
});
