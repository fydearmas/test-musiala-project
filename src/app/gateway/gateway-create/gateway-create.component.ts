import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Gateway } from '../gateway.model';
import { Device } from '../../device/device.model';
import { FormControl } from '@angular/forms';
import { GatewayService } from '../gateway.service';
import { DeviceService } from '../../device/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogClose,MatDialogActions } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-gateway-create',
  templateUrl: './gateway-create.component.html',
  styleUrls: ['./gateway-create.component.css'],
})
export class GatewayCreateComponent implements OnInit {
  selectedDevices: any;
  gat: Gateway[] = [];
  dev: Device[] = [];
  private mode = 'create';
  private id: any;
  gateway: any;
  table_devices: Device[] = [];
  devSub: Subscription = new Subscription();
  dialog: any;

  constructor(
    public gatewayService: GatewayService,
    public deviceService: DeviceService,
    public route: ActivatedRoute,
    dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.deviceService.getDevices();
    this.devSub = this.deviceService
      .getDevicesUpdateListener()
      .subscribe((devices: Device[]) => {
        this.dev = devices;
      });

  }

  open() {
    const dialogRef = this.dialog.open(DialogComponent, {});
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
    });
  }

  saveGateway(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.device === '') {
      form.value.device = [];
    }
    if (form.value.device.length > 10) {
      alert('There are more than 10 items in the selection.');
    }
    if(form.value.serial === this.gatewayService.getGatewayBySerial(form.value.serial)){
      return
    }
    this.gatewayService.addGateway(
      form.value.serial,
      form.value.name,
      form.value.ip,
      form.value.device
    );
    form.resetForm();
  }
}
