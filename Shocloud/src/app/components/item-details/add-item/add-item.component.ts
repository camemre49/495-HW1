import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonDirective } from 'primeng/button';
import { NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { StyleService } from '../../../services/style.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ItemService} from '../../../services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  standalone: true,
  imports: [
    Toolbar,
    ButtonDirective,
    NgIf,
    TableModule,
    FormsModule,
    InputText
  ],
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  newItem: {
    category: string;
    seller: string;
    image: string;
    size: string;
    material: string;
    price: number;
    name: string;
    description: string;
    age: number;
    batteryLife: number
  } = {
    category: '',
    name: '',
    description: '',
    price: 0,
    seller: '',
    image: '',
    batteryLife: 0,
    age: 0,
    size: '',
    material: ''
  };

  categoryName: string = '';
  rawCategoryName: string = "";

  constructor(
    private styleService: StyleService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.styleService.labelWidth = '125px';
      this.styleService.labelHeight = '30px';
    });

    // Get the category name from the route parameters
    this.route.paramMap.subscribe(params => {
      const rawCategoryName = params.get('categoryName') || ''; // Get category name from URL
      this.rawCategoryName = rawCategoryName;
      this.categoryName = this.formatCategoryName(rawCategoryName); // Format it
    });
  }

  // Function to remove "s" at the end and capitalize the category name
  formatCategoryName(category: string): string {
    if (category.endsWith("watches")) {
      category = category.replace("watches", "watch");
    }
    // Remove the trailing 's' if it exists
    let formattedCategory = category.endsWith('s') ? category.slice(0, -1) : category;

    // Capitalize each word
    formattedCategory = formattedCategory
      .split(' ') // Split into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back together

    return formattedCategory;
  }

  submitNewItem() {
    this.newItem.category = this.rawCategoryName.toLowerCase()
    this.itemService.submitNewItem(this.newItem).subscribe(
      (response) => {
        // Handle success
        console.log('Item submitted successfully', response);
        // Reset form after submitting
        this.newItem = {
          category: '',
          name: '',
          description: '',
          price: 0,
          seller: '',
          image: '',
          batteryLife: 0,
          age: 0,
          size: '',
          material: ''
        };
      },
      (error) => {
        // Handle error
        console.error('Error submitting item', error);
      }
    );
  }

  navigateToUserPanel() {
    this.router.navigate(['/profile']);
  }

  navigateToHomePanel() {
    this.router.navigate(['/home']);
  }
}
