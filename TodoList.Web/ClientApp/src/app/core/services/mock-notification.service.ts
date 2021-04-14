import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockNotificationService {
  show(title, message, type) {

  }

  showError(message: string, title?: string) {

  }

  showErrors(messages: string[], title: string) {

  }

  showSuccess(message: string, title?: string) {

  }
}
