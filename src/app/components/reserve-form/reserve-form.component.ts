import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.scss'],
})
export class ReserveFormComponent implements OnInit {

  @Input() reserveInfo

  reserveForm: FormGroup = new FormGroup({

  })

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  close() {
    this.modalCtrl.dismiss()
  }

}
