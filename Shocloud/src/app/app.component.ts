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
export class AppComponent{
  title = 'Shocloud';
}
