import { Component, OnInit } from '@angular/core';
import {Rating} from 'primeng/rating';
import {Button, ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {StyleService} from '../../services/style.service';
import {Toolbar} from 'primeng/toolbar';
import {PrimeTemplate} from 'primeng/api';
import {UserService} from '../../services/user.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  standalone: true,
  imports: [
    Rating,
    ButtonDirective,
    Card,
    NgForOf,
    FormsModule,
    Toolbar,
    PrimeTemplate,
    NgIf
  ],
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit {
  fetchItems(category: string): void {
    this.itemService.fetchItemsByCategory(category).subscribe(
      (data) => {
        this.categoryDescription = data.description;
        this.items = data.items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  categoryTitle = '';
  categoryDescription = '';
  items: any[] = [];
  selectedItem: any;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private styleService: StyleService,
    private router: Router,
    private userService: UserService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })

    this.route.paramMap.subscribe(params => {
      const categoryName = params.get('categoryName');
      if (categoryName) {
        this.categoryTitle =
          categoryName.split(' ') // Split title into words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
          .join(' '); // Join words back into a single string;
        this.fetchItems(categoryName);
      }
    });

    this.isAdmin = this.userService.isAdmin();
  }

  /*
  fetchItems(category: string): void {
    this.http.get<any>(`http://localhost:3000/categories/${category}`).subscribe(
      (data) => {
        this.categoryDescription = data.description;
        this.items = data.items;
      },
      (err) => {
        console.error('Failed to load category items', err);
      }
    );
  }
  */

  rateItem(item: any): void {
    this.selectedItem = item;
    // Open your rating panel here (if you're using popover or dialog)
  }

  navigateToHomePanel() {
    this.router.navigate(['/home'])
  }

  navigateToUserPanel() {
    this.router.navigate(['/profile'])
  }

  goToItemDetails(itemId: string): void {
    this.router.navigate([`/home/items/${itemId}`]);
  }

  navigateToAddItemComponent() {
    this.router.navigate([`/home/${this.categoryTitle.toLowerCase()}/addItem`])
  }
}
