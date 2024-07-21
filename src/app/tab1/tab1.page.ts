import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groceries: Array<{ name: string, quantity: number }>;

  constructor(private toastController: ToastController) {
    this.groceries = [
      { name: 'Apples', quantity: 2 },
      { name: 'Bananas', quantity: 3 },
      { name: 'Carrots', quantity: 1 },
      { name: 'Dairy Milk', quantity: 4 }
    ];
  }

  async removeItem(item: { name: string, quantity: number }) {
    console.log("Removing Item - ", item);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + ' ...',
      duration: 3000
    });
    toast.present();
  }
}
