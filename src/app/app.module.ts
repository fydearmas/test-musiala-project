import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GatewayCreateComponent } from './gateway/gateway-create/gateway-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogClose } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GatewayListComponent } from './gateway/gateway-list/gateway-list.component';
import { DeviceCreateComponent } from './device/device-create/device-create.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    GatewayCreateComponent,
    HeaderComponent,
    GatewayListComponent,
    DeviceCreateComponent,
    DeviceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
