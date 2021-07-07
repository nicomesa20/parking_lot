import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, MenuController, ModalController, NavController } from '@ionic/angular';
import { ReserveFormComponent } from '../components/reserve-form/reserve-form.component';
import { User } from '../model/user';
import { ReserveService } from '../services/reserve.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { observeAuthService } from '../utils/services/observeAuth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userId: number = this.observeAuth.getItem('user').id
  user: User

  reserveForm: FormGroup = new FormGroup({
    vehicle_type: new FormControl('auto', Validators.required),
    number_plate: new FormControl('', Validators.required)
  })

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: NavController,
    private toastService: ToastService,
    private reserveService: ReserveService,
    private menu: MenuController,
    private observeAuth: observeAuthService,
    private userService: UserService
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.userService.get(this.userId).subscribe(user => {
      this.user = user
      this.reserveForm.get('number_plate').patchValue(this.user.number_plate)
    })
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
    this.reserveService.add(reserveInfo).subscribe(_ => {
      this.toastService.presentToast('Reservación generada con éxito', 'success')
      this.router.navigateForward('reserves')
    })
  }

}
