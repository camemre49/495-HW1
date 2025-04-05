import {Component, Injector, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Shocloud';
  apiService: ApiService


  constructor(private injector: Injector) {
    this.apiService = injector.get(ApiService)
  }


  ngOnInit() {
    console.log(this.title)
    this.apiService.getItems().subscribe(message => {
      console.log(message)
    })
  }
}
