import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PlaceComponent } from './item/place/place.component';
import { HotelComponent } from './item/hotel/hotel.component';
import { TransferComponent } from './item/transfer/transfer.component';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from './utils/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PackageComponent } from './package/package.component';
import { ItemComponent } from './item/item.component';
import { MatMenuModule } from '@angular/material/menu';
import { NotifyService } from './services/notify.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    MatMenuModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ItemComponent,
    PlaceComponent,
    HotelComponent,
    TransferComponent,
    PackageComponent
  ],
  providers: [NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
