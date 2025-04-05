import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getItems(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, {
      username: username,
      password: password
    });
  }
}
