import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async message(title: string, color: string, text: string) {
    const toast = await this.toastCtrl.create({
      header: title,
      message: text,
      color: color
    })
    toast.present()
  }
}
