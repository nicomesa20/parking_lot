import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Reserve } from 'src/app/model/reserve';
import { SlotRes } from 'src/app/model/slot-res';
import { ReserveService } from 'src/app/services/reserve.service';
import { SlotService } from 'src/app/services/slot.service';
import { AlertService } from 'src/app/utils/services/alert.service';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.scss'],
})
export class ReserveFormComponent implements OnInit {

  @Input() reserveInfo: Reserve

  today = new Date().toISOString()
  slotsList: SlotRes[]

  reserveForm: FormGroup = this.fb.group({
    number_plate: ['', Validators.required],
    vehicle_type: ['', Validators.required],
    initial_hour: ['', Validators.required],
    final_hour: ['', Validators.required],
    slot: ['', Validators.required],
  })

  constructor(
    private modalCtrl: ModalController,
    private slotService: SlotService,
    private reserveService: ReserveService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.reserveForm.patchValue(this.reserveInfo)
    this.slotService.list().subscribe(data => {
      this.slotsList = data['data']
    })
  }

  close() {
    this.modalCtrl.dismiss()
  }

  createReservation(value) {
    value['initial_hour'] = this.convertDateHour(value['initial_hour'])
    value['final_hour'] = this.convertDateHour(value['final_hour'])
    this.reserveService.add(value).subscribe(_ => {
      this.alertService.message('Reserva', 'success', 'Su reservación se ha generado!')
      this.close()
    })    
  }

  convertDateHour(date: String) {
    return `${date.slice(0,date.indexOf('T'))} ${date.slice(date.indexOf('T') + 1, date.indexOf('.')-3)}`
  }

}
