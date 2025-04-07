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
import {ItemService} from '../../services/item.service';

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
  isReviewSubmitted: boolean = false; // Flag to check if user has submitted a review
  userRating: number = 0; // Rating selected by the user
  userReview: string = ''; // Review text by the user

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private styleService: StyleService,
    private router: Router,
    private loginService: LoginService,
    private itemService: ItemService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    });

    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName')!;
      this.itemId = params.get('itemId')!;
      this.fetchItemDetails();
    });

    this.isAdmin = this.loginService.isAdmin();
  }

  fetchItemDetails(): void {
    this.itemService.fetchItemDetails(this.itemId).subscribe(
      (data) => {
        this.item = data;
        // Check if the current user has already reviewed
        const userReview = this.item.itemRatingsAndReviews?.find((review: any) => review.username === this.loginService.getLoggedInUser().username);
        if (userReview) {
          this.isReviewSubmitted = true;
          this.userRating = userReview.rating;
          this.userReview = userReview.review;
        }
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
  }

  submitReview(): void {
    const requestedBy = this.loginService.getLoggedInUser().id; // Assuming you have a method to get logged-in user ID
    const reviewData = {
      username: this.loginService.getLoggedInUser().username,
      rating: this.userRating,
      review: this.userReview,
      requestedBy
    };

    this.itemService.submitReview(this.itemId, reviewData).subscribe(
      (response) => {
        alert('Review submitted successfully!');
        this.isReviewSubmitted = true;
        this.fetchItemDetails(); // Fetch updated item details with the review
      },
      (error) => {
        console.error('Error submitting review:', error);
      }
    );
  }

  editReview(): void {
    // Allow the user to update their review
    this.isReviewSubmitted = false;
  }

  navigateToHomePanel() {
    this.router.navigate(['/home'])
  }

  navigateToUserPanel() {
    this.router.navigate(['/profile'])
  }

  removeItem() {
    if (confirm('Are you sure you want to delete this item?')) {
      // Fetch the requestedBy from the logged-in user
      const requestedBy = this.loginService.getLoggedInUser().id; // Assuming you have a method for this

      // Call the removeItem method with requestedBy
      this.itemService.removeItem(this.itemId, requestedBy).subscribe(
        (response) => {
          alert('Item removed successfully');
          this.router.navigate([`/home/${this.categoryName}`])
        },
        (error) => {
          console.error('Error removing item:', error);
        }
      );
    }
  }
}
