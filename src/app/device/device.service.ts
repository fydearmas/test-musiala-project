import { Gateway } from './../gateway/gateway.model';
import { Device } from './device.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DeviceService {
  private devices: Device[] = [];
  private deviceUpdated = new Subject<Device[]>();

  constructor(private http: HttpClient) {}

  getDevices() {
    this.http
      .get<{ message: string; devices: Device[]}>(
        'http://localhost:3000/api/devices'
      ).subscribe((gData) => {
        this.devices = gData.devices;
        this.deviceUpdated.next([...this.devices]);
      });
  }

  getDevicesUpdateListener() {
    return this.deviceUpdated.asObservable();
  }

  getDevice(id: any) {
    return { ...this.devices.find((p) => p.uid === id) };
  }

  addDevice(uid: string, vendor: string, date_created: string, status: string) {
    const device: Device = {
      id: null,
      uid: uid,
      vendor: vendor,
      date_created: date_created,
      status: status,
    };
    this.http
      .post<{ message: string; id: any }>(
        'http://localhost:3000/api/devices',
        device
      )
      .subscribe((responseData) => {
        const id = responseData.id;
        device.id = id;
        this.devices.push(device);
        this.deviceUpdated.next([...this.devices]);
      });
  }

  deleteDevice(id: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/devices/' + id)
      .subscribe(() => {
        const updatedDevice = this.devices.filter((dev) => dev.id !== id);
        this.devices = updatedDevice;
        this.deviceUpdated.next([...this.devices]);
      });
  }
}
