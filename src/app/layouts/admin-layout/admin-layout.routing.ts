import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ItemComponent } from '../../item/item.component';
import { PackageComponent } from '../../package/package.component';
import { PlaceComponent } from 'app/item/place/place.component';
import { HotelComponent } from 'app/item/hotel/hotel.component';
import { TransferComponent } from 'app/item/transfer/transfer.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'item', component: ItemComponent },
    { path: 'package', component: PackageComponent },
    { path: 'item/place', component: PlaceComponent },
    { path: 'item/hotel', component: HotelComponent },
    { path: 'item/transfer', component: TransferComponent }
];
