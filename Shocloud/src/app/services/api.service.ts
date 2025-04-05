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

}
