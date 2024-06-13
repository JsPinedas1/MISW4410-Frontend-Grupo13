/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { RecetaService } from './receta.service';

describe('Service: Receta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecetaService]
    });
  });

  it('should ...', inject([RecetaService], (service: RecetaService) => {
    expect(service).toBeTruthy();
  }));
});
