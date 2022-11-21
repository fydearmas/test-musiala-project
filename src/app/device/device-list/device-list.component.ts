import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Gateway } from '../../gateway/gateway.model';
import { Device } from '../device.model';
import { FormControl } from '@angular/forms';
import { GatewayService } from '../../gateway/gateway.service';
import { DeviceService } from '../device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  selectedDevices: any;
  gat: Gateway[] = [];
  dev: Device[] = [];
  private mode = 'create';
  private id : any ;
  gateway: any;



  constructor(
    public gatewayService: GatewayService,
    public deviceService: DeviceService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gatewayService.getGateways();
    this.selectedDevices = this.deviceService.getDevices();
  }

  saveDevice(form: NgForm) {
    if (form.invalid) {
      return;
    }
     this.deviceService.addDevice(
      form.value.uid,
      form.value.vendor,
      form.value.date_created,
      form.value.staus
    );
    form.resetForm();
  }
}
