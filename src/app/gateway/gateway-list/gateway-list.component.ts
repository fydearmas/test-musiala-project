import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Gateway } from '../gateway.model';
import { Device } from 'src/app/device/device.model';
import { GatewayService } from '../gateway.service';
@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.css'],
})
export class GatewayListComponent implements OnInit, OnDestroy {
  constructor(public gatewayService: GatewayService) {}


  table_gateway: Gateway[] = [];
  gatSub: Subscription = new Subscription();
  ngOnInit(): void {
    // this.table_gateway = this.gatewayService.getGateways();
    this.gatewayService.getGateways();
    this.gatSub = this.gatewayService
      .getGatewayUpdateListener()
      .subscribe((gateways: Gateway[]) => {
        this.table_gateway = gateways;
      });
  }
  displayedColumns: string[] = ['id','serial', 'name', 'ip', 'devices', 'options'];
  dataSource = this.table_gateway;


  onDelete(id: string) {
    this.gatewayService.deleteGateway(id);
  }

  ngOnDestroy() {
    this.gatSub.unsubscribe();
  }
}
