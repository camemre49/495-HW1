import {Component, Input, OnInit} from '@angular/core';
import {Carousel} from 'primeng/carousel';
import {Button} from 'primeng/button';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {Tooltip} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Popover} from 'primeng/popover';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {StyleService} from '../../../services/style.service';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  standalone: true,
  imports: [
    Carousel,
    Rating,
    FormsModule,
    Tooltip,
    OverlayPanelModule,
  ],
  styleUrls: ['./category-section.component.css']
})
export class CategorySectionComponent implements OnInit{
  @Input() title!: string;
  @Input() description!: string;
  @Input() items: any[] = [];
  @Input() carouselId: string = '';

  constructor(private router: Router, private styleService: StyleService) {}

  ngOnInit() {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })
  }

  goToCategory(): void {
    this.router.navigate(['/home', this.title.toLowerCase()]);
  }

  navigateToItem(itemId: any) {
    this.router.navigate([`/home/items/${itemId}`])
  }
}
