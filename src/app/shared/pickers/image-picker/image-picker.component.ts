import { Component } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent {
  selectedImage: string | undefined | null;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform
  ) {}

  async onPickImage() {
    if (this.platform.is('capacitor')) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Select Image Source',
        buttons: [
          {
            text: 'Take Picture',
            icon: 'camera',
            handler: () => {
              this.takePicture(CameraSource.Camera);
            },
          },
          {
            text: 'Choose From Gallery',
            icon: 'image',
            handler: () => {
              this.takePicture(CameraSource.Photos);
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
      await actionSheet.present();
    } else {
      this.takePicture(CameraSource.Photos);
    }
  }

  async takePicture(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source,
    });

    this.selectedImage = image.dataUrl;
  }

  onRemoveImage() {
    this.selectedImage = null;
  }
}
