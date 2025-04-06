import {Component, Input, ViewChild} from '@angular/core';
import {Carousel} from 'primeng/carousel';
import {Button} from 'primeng/button';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {Tooltip} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Popover} from 'primeng/popover';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  standalone: true,
  imports: [
    Carousel,
    Button,
    Rating,
    FormsModule,
    Tooltip,
    OverlayPanelModule,
    Popover,
    NgIf
  ],
  styleUrls: ['./category-section.component.css']
})
export class CategorySectionComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() items: any[] = [];
  @Input() carouselId: string = '';

  @ViewChild('ratingPanel') ratingPanel!: Popover
  selectedItem: any = {};

  toggleRatingPanel(item: any) {
    this.selectedItem = { ...item, rating: 0 };
    console.log(this.selectedItem)
  }

  submitRating() {
    console.log('Rating submitted:', this.selectedItem.rating);
    setTimeout(() => {
      this.ratingPanel.hide()
    }, 300)
    this.selectedItem = {}
  }
}
