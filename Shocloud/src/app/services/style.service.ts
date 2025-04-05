import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface ImageStyles {
  width: string;
  height: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  // Customizable properties
  labelWidth = '250px';
  labelHeight = '60px';
  isLabelVisible = true;

  getImageStyles(): ImageStyles {
    return {
      height: this.labelHeight,
      width: this.labelWidth,
      visible: this.isLabelVisible
    };
  }

  setDefault() {
    setTimeout(() => {
      this.labelWidth = "250px";
      this.labelHeight = "60px";
      this.isLabelVisible = true;
    })
  }
}
