import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgStyle],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(private router: Router) {}

  getImageStyles() {
    const currentRoute = this.router.url
    if (currentRoute === '/login') {
      return { width: '250px', height: '60px' };
    }
    return { width: '150px', height: '40px' };
  }
}
