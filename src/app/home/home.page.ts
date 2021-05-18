import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, MenuController, ModalController, NavController } from '@ionic/angular';
import { ReserveFormComponent } from '../components/reserve-form/reserve-form.component';
import { ReserveService } from '../services/reserve.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  reserveForm: FormGroup = new FormGroup({
    vehicle_type: new FormControl('car', Validators.required),
    number_plate: new FormControl('', Validators.required)
  })

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: NavController,
    private toastService: ToastService,
    private reserveService: ReserveService,
    private menu: MenuController
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  async generateReserve(reserveInfo) {
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

  park(reserveInfo) {
    this.reserveService.add(reserveInfo).subscribe(data => {
      this.toastService.presentToast('Reservación generada con éxito', 'success')
      this.router.navigateForward('reserves')
    })
  }

}
