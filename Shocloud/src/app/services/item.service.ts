import {Injectable, Injector} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  vinylsItems: any[] = [];
  antiqueFurnitureItems: any[] = [];
  gpsSportWatchesItems: any[] = [];
  runningShoesItems: any[] = [];

  private loggedInUser: any;
  protected API_URL = environment.apiUrl;


  constructor(
    private injector: Injector,
    private http: HttpClient,
    private loginService: LoginService // Inject LoginService here
  ) {
    // Optionally, you can access the login service during initialization
    this.loggedInUser = this.loginService.getLoggedInUser(); // Assuming a method to get the logged-in user
  }


  // Function to fetch 6 random items for a specific category
  fetchRandomItems(category: string): void {
    this.http.get<any[]>(`${this.API_URL}/items/random/${category}`).subscribe(
      (data) => {
        // Depending on the category, assign the data to the corresponding property
        switch (category) {
          case 'vinyls':
            this.vinylsItems = data;
            break;
          case 'antique-furniture':
            this.antiqueFurnitureItems = data;
            break;
          case 'gps-sport-watches':
            this.gpsSportWatchesItems = data;
            break;
          case 'running-shoes':
            this.runningShoesItems = data;
            break;
          default:
            break;
        }
      },
      (err) => {
        console.error('Failed to fetch random items', err);
      }
    );
  }

  submitNewItem(newItem: any): Observable<any> {
    console.log(this.loggedInUser.id)
    return this.http.post<any>(`${this.API_URL}/items`,
      {
        ...newItem,
        requestedBy: this.loggedInUser.id
      });
  }
}
