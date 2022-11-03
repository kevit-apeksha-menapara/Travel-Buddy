import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  packageForm;
  actionType;
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
    actions:[
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
        width: 20,
        type: "text",
        name: "",
        value: "details2"
      },
      {
        width: 20,
        type: "text",
        name: "Sub Total",
        value: "subTotal"
      }
    ],
    actions:[
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
  data = [{
    type: "Hotel",
    details1: "Fern",
    details2: "5",
    subTotal: "5000",
    isEdit: false,
    isCreate: false
  },
  {
    type: "Hotel",
    details1: "Fern",
    details2: "5",
    subTotal: "5000",
    isEdit: false,
    isCreate: false
  }
  ];
  types = [{
    value: "Hotel"
  },
  {
    value: "Place"
  },
  {
    value: "Transfer"
  }];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.packageForm = new FormGroup({
      "name": new FormControl("",Validators.required),
      "days": new FormControl("",Validators.required)
    });
  }

  onAction({type,index},templateRef?) {
    switch (type) {
      case "edit":
        this.openDialog(templateRef,"editPackage",index);
        break;
      case "delete":
        this.openDeleteDialog(index);
        break;
    }
  }

  openDialog(templateRef,type,index?){
    if (type === "editPackage") {
      this.actionType = type;
      this.packageForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Package", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    } else {
      this.actionType = type;
      this.packageForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Package", template: templateRef },
        height: "auto",
        width: "70vw"
      });
    }
  }

  openDeleteDialog(index) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      panelClass: "addUser",
      data: {
        title: "Delete",
        template: undefined,
        isDelete: true,
        delete: {
          text: this.packageData[index].name ? this.packageData[index].name : ""
        }
      },
      height: "auto",
      width: "40vw"
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
      else{
        console.log("cancel clicked");
      }
    });
  }

  addItem(){
    this.data[0].isCreate = true;
    this.data[0].isEdit = false;
  }

}
