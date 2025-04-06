import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {StyleService} from '../../services/style.service';
import {NgForOf, NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {PrimeTemplate} from 'primeng/api';
import {Rating} from 'primeng/rating';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ButtonDirective,
    Toolbar,
    PrimeTemplate,
    Rating,
    TableModule,
    FormsModule
  ],
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: any;
  categoryName: string;
  itemId: string;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private styleService: StyleService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })

    // Get both categoryName and itemId from route parameters
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName')!;
      this.itemId = params.get('itemId')!;
      this.fetchItemDetails();
    });

    this.isAdmin = this.loginService.isAdmin();
  }

  fetchItemDetails(): void {
    // Mock data instead of an API call
    const mockData = {
      id: this.itemId,
      name: 'Sample Item',
      description: 'This is a description of the item.',
      price: 99.99,
      seller: 'Sample Seller',
      image: 'https://via.placeholder.com/150',
      batteryLife: '20 hours',  // Only for relevant items
      age: 50,  // Only for relevant items
      size: 'Large',  // Only for relevant items
      material: 'Leather',  // Only for relevant items
      rating: 4.5,
      itemRatingsAndReviews: [
        { username: 'John Doe', rating: 5, review: 'Great product!' },
        { username: 'Jane Smith', rating: 4, review: 'Good value for the price.' }
      ]
    };

    // Simulating a successful API response
    setTimeout(() => {
      this.item = mockData;
    }, 500); // Simulate network delay
  }

  navigateToHomePanel() {
    this.router.navigate(['/home'])
  }

  navigateToUserPanel() {
    this.router.navigate(['/profile'])
  }

  removeItem() {
    // TODO
  }
}
