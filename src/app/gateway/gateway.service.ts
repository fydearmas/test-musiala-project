import { Gateway } from './gateway.model';
import { Device } from './../device/device.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GatewayService {
  private gateways: Gateway[] = [];
  private gatewayUpdated = new Subject<Gateway[]>();

  constructor(private http: HttpClient) {}

  getGateways() {
    this.http
      .get<{ message: string; gateways: any }>(
        'http://localhost:3000/api/gateways'
      )
      .pipe(
        map((gData) => {
          return gData.gateways.map((gat: any) => {
            return {
              id: gat._id,
              serial: gat.serial,
              name: gat.name,
              ip: gat.ip,
              devices: gat.devices,
            };
          });
        })
      )
      .subscribe((gat) => {
        this.gateways = gat;
        this.gatewayUpdated.next([...this.gateways]);
      });
  }

  getGatewayUpdateListener() {
    return this.gatewayUpdated.asObservable();
  }

  getGateway(id: any) {
    return { ...this.gateways.find((p) => p.id === id) };
  }

  getGatewayBySerial(serial: string) {
    this.http.get<{ _id: string;serial: string; name: string; ip: string }>(
      'http://localhost:3000/api/gateways/' + serial
    ).pipe(
      map((gData) => {
          return {
            id: gData._id,
            serial: gData.serial,
            name: gData.name,
            ip: gData.ip,
          };
      })
    )
  }

  addGateway(serial: string, name: string, ip: string, devices: Device[]) {
    const gateway: Gateway = {
      id: null,
      serial: serial,
      name: name,
      ip: ip,
      devices: devices,
    };
    this.http
      .post<{ message: string; id: string }>(
        'http://localhost:3000/api/gateways',
        gateway
      )
      .subscribe((responseData) => {
        const id = responseData.id;
        gateway.id = id;
        this.gateways.push(gateway);
        this.gatewayUpdated.next([...this.gateways]);
      });
  }

  deleteGateway(id: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/gateways/' + id)
      .subscribe(() => {
        const updatedGateway = this.gateways.filter((gat) => gat.id !== id);
        this.gateways = updatedGateway;
        this.gatewayUpdated.next([...this.gateways]);
      });
  }
}
