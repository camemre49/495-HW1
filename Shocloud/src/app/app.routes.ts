import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {CategoryItemsComponent} from './components/category-items/category-items.component';
import {ItemDetailsComponent} from './components/item-details/item-details.component';
import {AddItemComponent} from './components/item-details/add-item/add-item.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'home/:categoryName',
    component: CategoryItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/:categoryName/addItem',
    component: AddItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/items/:itemId',
    component: ItemDetailsComponent,
    canActivate: [AuthGuard]
  }
];
