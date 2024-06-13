/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ChefService } from './chef.service';

describe('Service: Chef', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChefService]
    });
  });

  it('should ...', inject([ChefService], (service: ChefService) => {
    expect(service).toBeTruthy();
  }));
});
