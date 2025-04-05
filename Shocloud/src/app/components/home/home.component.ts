import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StyleService} from '../../services/style.service';
import {Toolbar} from 'primeng/toolbar';
import {Button, ButtonDirective, ButtonIcon} from 'primeng/button';
import {Carousel} from 'primeng/carousel';
import {Card} from 'primeng/card';
import {NgForOf} from '@angular/common';
import {Tag} from 'primeng/tag';

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
    Button
  ],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  vinylsItems = [
    { name: 'Vinyl Record 1', imageUrl: 'label.png' },
    { name: 'Vinyl Record 2', imageUrl: 'label.png' },
    { name: 'Vinyl Record 3', imageUrl: 'label.png' },
    { name: 'Vinyl Record 4', imageUrl: 'label.png' },
    { name: 'Vinyl Record 5', imageUrl: 'label.png' },
    // Add more items
  ];

  antiqueFurnitureItems = [
    { name: 'Antique Chair', imageUrl: 'label.png' },
    { name: 'Antique Table', imageUrl: 'label.png' },
    { name: 'Antique Table 2', imageUrl: 'label.png' },
    { name: 'Antique Table 3', imageUrl: 'label.png' },
    { name: 'Antique Table 4', imageUrl: 'label.png' }

    // Add more items
  ];

  gpsSportWatchesItems = [
    { name: 'GPS Watch 1', imageUrl: 'label.png' },
    { name: 'GPS Watch 2', imageUrl: 'label.png' },
    { name: 'GPS Watch 3', imageUrl: 'label.png' },
    { name: 'GPS Watch 4', imageUrl: 'label.png' },
    { name: 'GPS Watch 5', imageUrl: 'label.png' },
    // Add more items
  ];

  runningShoesItems = [
    { name: 'Running Shoe 1', imageUrl: 'label.png' },
    { name: 'Running Shoe 2', imageUrl: 'label.png' },
    { name: 'Running Shoe 3', imageUrl: 'label.png' },
    { name: 'Running Shoe 4', imageUrl: 'label.png' },
    { name: 'Running Shoe 5', imageUrl: 'label.png' }
    // Add more items
  ];

  constructor(private styleService: StyleService) {
  }
  ngOnInit() {
    setTimeout(() => {
      this.styleService.labelWidth = "125px";
      this.styleService.labelHeight = "30px";
    })
  }

}
