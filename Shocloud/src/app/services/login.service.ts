import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private loggedInUser: {
    id?: number;
    username?: string;
    role?: string;
    ratingsAndReviews?: any;
  } = {};

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, {
      username,
      password
    });
  }

  addUser(user: { username: string; password: string; role: string }) {
    return this.http.post(`${this.API_URL}/users`, {
      ...user,
      requestedBy: this.loggedInUser.id
    });
  }

  searchUsers(query: string) {
    const requestedBy = this.loggedInUser?.id ?? '';
    return this.http.get<any[]>(`${this.API_URL}/searchUsers`, {
      params: {
        username: query,
        requestedBy: requestedBy
      }
    });
  }

  removeUser(userId: string) {
    return this.http.delete(`${this.API_URL}/removeUser/${userId}`,
      {
        body: { requestedBy: this.loggedInUser.id }
      });
  }

  updateLoggedInUser(res: any) {
    this.loggedInUser = {
      id: res.id,
      username: res.username,
      role: res.role,
      ratingsAndReviews: res.ratingsAndReviews
    };
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser.id;
  }

  isAdmin(): boolean {
    return this.loggedInUser.role === 'admin';
  }

  getUser(): any {
    return this.loggedInUser;
  }

  getLoggedInUser() {
    return this.loggedInUser
  }
}
