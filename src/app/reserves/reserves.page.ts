import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { ReserveDetailComponent } from '../components/reserve-detail/reserve-detail.component';
import { ReserveFormComponent } from '../components/reserve-form/reserve-form.component';
import { Reserve } from '../model/reserve';
import { ReserveService } from '../services/reserve.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.page.html',
  styleUrls: ['./reserves.page.scss'],
})
export class ReservesPage implements OnInit {

  reserves: Reserve[] = []

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: NavController,
    private toastService: ToastService,
    private reserveService: ReserveService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.loadReserves()
  }

  async showReserve(reserveInfo: Reserve) {
    const modal = await this.modalCtrl.create({
      component: ReserveDetailComponent,
      componentProps: {
        reserveInfo
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      mode: 'ios',
    });
    return await modal.present();
  }

  loadReserves() {
    this.reserveService.list().subscribe(reserves => {
      this.reserves = reserves['data']
      console.log(reserves);
      
    })
  }

  async editReserve(reserveInfo: Reserve) {
    const modal = await this.modalCtrl.create({
      component: ReserveFormComponent,
      componentProps: {
        reserveInfo
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      mode: 'ios',
    });
    return await modal.present();
  }

  async deleteReserve(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Reserva',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.reserveService.remove(id).subscribe(() => {
              this.toastService.presentToast('Reserva eliminada', 'success')
            })
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    })
    await actionSheet.present();
  }

}
