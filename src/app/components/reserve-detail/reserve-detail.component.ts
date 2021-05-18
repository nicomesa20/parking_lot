import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss'],
})
export class ReserveDetailComponent implements OnInit {

  data = 'tescor tiene el pito chiquito'

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss()
  }

}
