import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AppSettingsService {
  constructor() { }

  public getApiUrl(): string {
    if (environment.apiUrl !== "") {
      return environment.apiUrl;
    }
    else if (window.location.hostname.indexOf('-') !== -1) {
      const apiUrl = window.location.hostname.split('-');
      apiUrl.splice(1, 0, 'api');

      return `${window.location.protocol}//${apiUrl.join('-')}`;
    }
    else {
      const apiUrl = window.location.hostname.split('.');
      apiUrl[0] = apiUrl[0] + '-api';

      return `${window.location.protocol}//${apiUrl.join('.')}`;
    }
  }



  public getTodoListsApiServiceUrl(): string {
    return this.getApiUrl() + "/api/todo-list";
  }


}
