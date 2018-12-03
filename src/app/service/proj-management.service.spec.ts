/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjManagementService } from './proj-management.service';

describe('ProjManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjManagementService]
    });
  });

  it('should ...', inject([ProjManagementService], (service: ProjManagementService) => {
    expect(service).toBeTruthy();
  }));
});
