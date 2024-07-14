
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groceries: Array<{ name: string }>;

  constructor() {
    this.groceries = [
      { name: 'Apples' },
      { name: 'Bananas' },
      { name: 'Carrots' },
      { name: 'Dairy Milk' }
    ];
  }
}

