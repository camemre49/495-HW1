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
    this.itemService.fetchItemDetails(this.itemId).subscribe(
      (data) => {
        this.item = data; // Set the actual data from the API response
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
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
