import { TestBed } from '@angular/core/testing';

import { Socket1Service } from './socket1.service';

describe('Socket1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Socket1Service = TestBed.get(Socket1Service);
    expect(service).toBeTruthy();
  });
});
