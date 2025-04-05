import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  protected API_URL = environment.apiUrl;

  constructor(protected http: HttpClient) {1
  }

}
