import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reserve } from 'src/app/model/reserve';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss'],
})
export class ReserveDetailComponent implements OnInit {
  
  @Input() reserveInfo: Reserve
  reserveInfoString

  dicVehicle = {
    auto: 'Automóvil',
    moto: 'Motocicleta',
  }

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.reserveInfoString = JSON.stringify(this.reserveInfo)
  }

  close() {
    this.modalCtrl.dismiss()
  }

}
