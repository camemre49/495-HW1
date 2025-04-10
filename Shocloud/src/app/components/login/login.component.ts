import {Component, Injector, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import {NgIf} from '@angular/common';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user.service';
import {StyleService} from '../../services/style.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    MessageModule,
    PasswordModule,
    DividerModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;
  userService: UserService;

  constructor(
    private http: HttpClient,
    private router: Router,
    private injector: Injector,
    private styleService: StyleService
  ) {
    this.userService = injector.get(UserService)
  }

  ngOnInit() {
    this.styleService.setDefault()
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.userService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate(['/home']); // Redirect after login
        this.userService.updateLoggedInUser(res.user)
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}
