import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async presentToast(message: string, color: 'success' | 'danger') {

    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color
    })
    toast.present()
  }
}
