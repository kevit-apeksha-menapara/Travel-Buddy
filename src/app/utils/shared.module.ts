import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
import { SearchComponent } from 'app/common-components/search/search.component';
import { TableComponent } from 'app/common-components/table/table.component';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
     TableComponent,
     SearchComponent,
     DialogComponent
    ],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatMenuModule
    ],
    exports: [
     TableComponent,
     SearchComponent,
     DialogComponent
    ]
  })
  export class SharedModule {}