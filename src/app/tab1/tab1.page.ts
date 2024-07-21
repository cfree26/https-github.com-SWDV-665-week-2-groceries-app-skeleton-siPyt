import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groceries: Array<{ name: string, quantity: number }>;

  constructor(private toastController: ToastController, private alertController: AlertController) {
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

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add Grocery Item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          min: 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.groceries.push({ name: data.name, quantity: data.quantity });
            this.showToast('Adding Item - ' + data.name + ' ...');
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}


