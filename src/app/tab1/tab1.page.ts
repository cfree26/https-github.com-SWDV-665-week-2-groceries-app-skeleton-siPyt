import { Component } from '@angular/core';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groceries: Array<{ name: string, quantity: number }> = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  // Create (Add) Item
  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add Grocery Item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Next',
          handler: data => {
            this.selectQuantity(data.name);
          }
        }
      ]
    });

    await alert.present();
  }

  // Select Quantity using ActionSheet
  async selectQuantity(name: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Quantity',
      buttons: [
        ...Array.from({ length: 10 }, (_, i) => ({
          text: (i + 1).toString(),
          handler: () => {
            this.groceries.push({ name, quantity: i + 1 });
            this.showToast(`Added ${name} with quantity ${i + 1}`);
          }
        })),
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  // Update Item
  async updateItem(item: { name: string, quantity: number }) {
    const alert = await this.alertController.create({
      header: 'Update Grocery Item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: item.name,
          placeholder: 'Item Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Next',
          handler: data => {
            this.selectQuantityForUpdate(data.name, item);
          }
        }
      ]
    });

    await alert.present();
  }

  // Select Quantity for Update using ActionSheet
  async selectQuantityForUpdate(name: string, item: { name: string, quantity: number }) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Quantity',
      buttons: [
        ...Array.from({ length: 10 }, (_, i) => ({
          text: (i + 1).toString(),
          handler: () => {
            const index = this.groceries.findIndex(g => g === item);
            if (index > -1) {
              this.groceries[index] = { name, quantity: i + 1 };
              this.showToast(`Updated ${name} to quantity ${i + 1}`);
            }
          }
        })),
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  // Delete Item
  async removeItem(item: { name: string, quantity: number }) {
    const alert = await this.alertController.create({
      header: 'Remove Grocery Item',
      message: `Are you sure you want to remove ${item.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.groceries = this.groceries.filter(grocery => grocery !== item);
            this.showToast('Removing Item - ' + item.name + ' ...');
          }
        }
      ]
    });

    await alert.present();
  }

  // Show Toast Message
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
