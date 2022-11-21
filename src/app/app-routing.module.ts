import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceCreateComponent } from './device/device-create/device-create.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { GatewayCreateComponent } from './gateway/gateway-create/gateway-create.component';
import { GatewayListComponent } from './gateway/gateway-list/gateway-list.component';

const routes: Routes = [
  { path: '', component: GatewayListComponent },
  { path: 'create_gateway', component: GatewayCreateComponent },
  { path: 'edit_gateway/:id', component: GatewayCreateComponent },
  { path: 'create_device', component: DeviceCreateComponent },
  { path: 'list_devices', component: DeviceListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
