import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  options: IndividualConfig;

  constructor(
    private toastr: ToastrService
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-bottom-center';
    this.options.enableHtml = true;
  }

  show(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  showError(message: string, title?: string) {
    this.toastr.show(message, title, this.options, 'toast-error');
  }

  showErrors(messages: string[], title: string) {
    let message: string = "";
    for (let i = 0; i < messages.length; i++) {
      message += messages[i] + "<br />";
    }
    this.toastr.show(message, title, this.options, 'toast-error');
  }

  showSuccess(message: string, title?: string) {
    this.toastr.show(message, title, this.options, 'toast-success');
  }
}
