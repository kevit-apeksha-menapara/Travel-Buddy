import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
import { HotelService } from 'app/services/hotel.service';
import { PlaceService } from 'app/services/place.service';
import { TransferService } from 'app/services/transfer.service';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  @ViewChild("deleteTemplate", { static: false })
  isDeleteTemplateRef: TemplateRef<any>;
  packageForm;
  dialogRef;
  table: ITable = {
    rows: [
      {
        width: 30,
        type: "text",
        name: "Name",
        value: "name"
      },
      {
        width: 20,
        type: "text",
        name: "Days",
        value: "days"
      },
      {
        width: 20,
        type: "text",
        name: "Brochure",
        value: "brochure"
      },
      {
        width: 17,
        type: "text",
        name: "Amount",
        value: "amount"
      }
    ],
    actions: [
      {
        type: "edit",
        name: "Edit",
        icon: "edit"
      },
      {
        type: "delete",
        name: "Delete",
        icon: "delete"
      }
    ]
  };
  itemTable: ITable = {
    rows: [
      {
        width: 25,
        type: "text",
        name: "Type",
        value: "type"
      },
      {
        width: 20,
        type: "text",
        name: "Details",
        value: "details1"
      },
      {
        width: 10,
        type: "text",
        name: "",
        value: "details2"
      },
      {
        width: 10,
        type: "text",
        name: "",
        value: "details3"
      },
      {
        width: 15,
        type: "text",
        name: "Sub Total",
        value: "subTotal"
      }
    ],
    actions: [
      {
        type: "edit",
        name: "Edit",
        icon: "edit"
      },
      {
        type: "delete",
        name: "Delete",
        icon: "delete"
      }
    ]
  };
  packageData = [{
    name: "Exquisite Udaipur",
    days: "5",
    brochure: "brochure",
    amount: "50,000"
  },
  {
    name: "Glimpse of Goa",
    days: "6",
    brochure: "brochure",
    amount: "60,000"
  }
  ];
  // packageData = [];
  // data = [{
  //   type: "Hotel",
  //   details1: "Fern",
  //   details2: "5",
  //   details3: "",
  //   subTotal: "5000"
  // },
  // {
  //   type: "Hotel",
  //   details1: "Fern",
  //   details2: "5",
  //   details3: "",
  //   subTotal: "5000"
  // }
  // ];
  data = [];
  types = [{
    value: "Hotel"
  },
  {
    value: "Place"
  },
  {
    value: "Transfer"
  }];
  actionType;
  editIndex;
  deleteIndex;
  deleteData: any;
  selectedType;
  names;
  transfers;
  numbers=["1","2","3","4","5","6","7","8","9","10"];

  constructor(private dialog: MatDialog,
              private placeService: PlaceService,
              private hotelService: HotelService,
              private transferService: TransferService) { }

  ngOnInit(): void {
    this.packageForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "days": new FormControl("", Validators.required)
    });
  }

  handleName() {
    if (this.selectedType == "Hotel") {
      this.hotelService.getHotel()
        .then((res: any) => {
          this.names = res.map(a => a.name);
          console.log(this.names);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else if (this.selectedType == "Place") {
      this.placeService.getPlace()
        .then((res: any) => {
          this.names = res.map(a => a.name);
          console.log(this.names);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else if(this.selectedType == 'Transfer'){
      this.transferService.getTransfer()
      .then((res: any) => {
        this.transfers = res.map(a => a.name);
        console.log(this.transfers);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  onAction({ type, index }, templateRef?) {
    this.editIndex = index;
    this.deleteIndex = index;
    switch (type) {
      case "edit":
        this.openDialog(templateRef, type);
        break;
      case "delete":
        this.openDialog(this.isDeleteTemplateRef, type);
        this.deleteData = this.packageData[index].name ? this.packageData[index].name : "";
        break;
    }
  }

  openDialog(templateRef, type) {
    if (type === "addPackage") {
      this.actionType = type;
      this.packageForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Package", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "edit") {
      // this.initForm();
      this.actionType = type;
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Package", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "delete") {
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: {
          title: "Delete Package",
          template: this.isDeleteTemplateRef,
        },
        height: "auto",
        width: "45vw"
      });
    }
  }
  addItem() {
    const newRow = {
    type: "",
    details1: "",
    details2: "",
    details3: "",
    subTotal: "",
    isCreate: true}
    this.data = [newRow,...this.data];
  }

  onCancel() {
    this.dialog.closeAll();
  }

}
