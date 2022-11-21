import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../device.service';

interface Status {
  status: string;
}


@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent implements OnInit {

  constructor(public deviceService: DeviceService) { }

  selectedValue: any;
  status: Status[] = [{ status: 'online' },{status: 'offline'}];
  ngOnInit(): void {
  }

  saveDevice(form : NgForm){
 if (form.invalid) {
      return;
    }
    this.deviceService.addDevice(
      form.value.serial,
      form.value.vendor,
      form.value.date_created,
      form.value.status
    );
    form.resetForm();
  }
}
