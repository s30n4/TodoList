import { TestBed } from '@angular/core/testing';

import { AppSetttingsService } from './app-setttings.service';

describe('AppSetttingsService', () => {
  let service: AppSetttingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSetttingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
