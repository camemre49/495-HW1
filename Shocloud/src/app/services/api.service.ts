import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getItems() {
    console.log(this.API_URL)
    return this.http.get(`${this.API_URL}/api/test`);
  }
}
