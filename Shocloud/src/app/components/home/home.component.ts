import {Component, OnInit} from '@angular/core';
import {StyleService} from '../../services/style.service';
import {Toolbar} from 'primeng/toolbar';
import {Button, ButtonDirective} from 'primeng/button';
import {Carousel} from 'primeng/carousel';
import {Card} from 'primeng/card';
import {NgForOf} from '@angular/common';
import {CategorySectionComponent} from './category-section/category-section.component';
import {Router} from '@angular/router';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    Toolbar,
    ButtonDirective,
    Carousel,
    Card,
    NgForOf,
    Button,
    CategorySectionComponent
  ],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private styleService: StyleService,
    public itemService: ItemService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })

    // Fetch random items for each category
    this.itemService.fetchRandomItems('vinyls');
    this.itemService.fetchRandomItems('antique-furnitures');
    this.itemService.fetchRandomItems('gps-sport-watches');
    this.itemService.fetchRandomItems('running-shoes');
  }

  navigateToUserPanel() {
    this.router.navigate(['/profile']);
  }
}
