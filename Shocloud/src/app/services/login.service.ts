import {Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService extends BaseService {
  getItems(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, {
      username: username,
      password: password
    });
  }
}
