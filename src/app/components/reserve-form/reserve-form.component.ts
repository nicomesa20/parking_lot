import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Reserve } from 'src/app/model/reserve';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.scss'],
})
export class ReserveFormComponent implements OnInit {

  @Input() reserveInfo: Reserve

  reserveForm: FormGroup = new FormGroup({
    number_plate: new FormControl('', Validators.required),
    vehicle_type: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
  })

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log(this.reserveInfo)
    this.reserveForm.patchValue(this.reserveInfo)
  }

  close() {
    this.modalCtrl.dismiss()
  }

}
