/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncabezadoService } from './encabezado.service';

describe('Service: Encabezado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncabezadoService]
    });
  });

  it('should ...', inject([EncabezadoService], (service: EncabezadoService) => {
    expect(service).toBeTruthy();
  }));
});
