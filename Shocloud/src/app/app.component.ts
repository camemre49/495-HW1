import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf, NgStyle} from '@angular/common';
import {ImageStyles, StyleService} from './services/style.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgStyle, NgIf],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(private styleService: StyleService) {}

  get imageStyles(): ImageStyles {
    return this.styleService.getImageStyles();
  }
}
