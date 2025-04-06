import { Component, OnInit } from '@angular/core';
import {Rating} from 'primeng/rating';
import {Button, ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {NgForOf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {StyleService} from '../../services/style.service';
import {Toolbar} from 'primeng/toolbar';
import {PrimeTemplate} from 'primeng/api';

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
    NgStyle,
    PrimeTemplate,
    Button
  ],
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit {
  fetchItems(category: string): void {
    // Mock data
    const mockCategoryData = {
      description: `Showing all items under ${category}`,
      items: [
        {
          id: 1,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 7,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 8,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 9,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 1,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 7,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 8,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 9,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 1,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 7,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 8,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 9,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 1,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 7,
          name: 'Mock Product 1',
          rating: 7,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 8,
          name: 'Mock Product 2',
          rating: 5,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 9,
          name: 'Mock Product 3',
          rating: 8,
          imageUrl: 'https://via.placeholder.com/150'
        }
      ]
    };

    this.categoryDescription = mockCategoryData.description;
    this.items = mockCategoryData.items;
  }

  categoryTitle = '';
  categoryDescription = '';
  items: any[] = [];
  selectedItem: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private styleService: StyleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })

    this.route.paramMap.subscribe(params => {
      const categoryName = params.get('categoryName');
      if (categoryName) {
        this.categoryTitle = categoryName;
        this.fetchItems(categoryName);
      }
    });
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
    this.router.navigate([`/home/${this.categoryTitle}/${itemId}`]);
  }

  addItem() {

  }

  removeItem() {

  }
}
