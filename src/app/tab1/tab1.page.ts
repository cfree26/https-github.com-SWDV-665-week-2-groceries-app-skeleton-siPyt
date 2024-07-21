import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groceries: Array<{ name: string, quantity: number }>;

  constructor() {
    this.groceries = [
      { name: 'Apples', quantity: 2 },
      { name: 'Bananas', quantity: 3 },
      { name: 'Carrots', quantity: 1 },
      { name: 'Dairy Milk', quantity: 4 }
    ];
  }

  removeItem(item: { name: string, quantity: number }) {
    this.groceries = this.groceries.filter(grocery => grocery !== item);
  }
}
