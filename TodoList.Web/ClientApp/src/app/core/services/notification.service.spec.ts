import { TestBed } from '@angular/core/testing';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  const toastrService = {
    options: { positionClass: 'toast-bottom-center', enableHtml: true },
    success: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => { },
    error: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => { },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ToastrModule],
      providers: [NotificationService,{ provide: ToastrService, useValue: toastrService }]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
