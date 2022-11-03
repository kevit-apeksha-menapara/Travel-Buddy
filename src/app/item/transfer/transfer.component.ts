import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transferForm;
  actionType;
  dialogRef;
  table: ITable = {
    rows: [
      {
        width: 45,
        type: "text",
        name: "Name",
        value: "name"
      },
      {
        width: 20,
        type: "text",
        name: "No. of Kilometers",
        value: "noOfKms"
      },
      {
        width: 20,
        type: "text",
        name: "Charge/Km",
        value: "charge"
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
  transferData = [{
    name: "Rajkot to Udaipur",
    noOfKms: "475",
    charge: "15"
  },
  {
    name: "Udaipur to Jodhpur",
    noOfKms: "250",
    charge: "13"
  }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.transferForm = new FormGroup({
      "name": new FormControl("",Validators.required),
      "source": new FormControl("",Validators.required),
      "destination": new FormControl("",Validators.required),
      "noOfKms": new FormControl("",Validators.required),
      "charge": new FormControl("",Validators.required)
    })
  }

  onAction({type,index},templateRef?) {
    switch (type) {
      case "edit":
        this.openDialog(templateRef,"editTransfer",index);
        break;
      case "delete":
        this.openDeleteDialog(index);
        break;
    }
  }

  openDialog(templateRef,type,index?){
    if (type === "editTransfer") {
      this.actionType = type;
      this.transferForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Transfer", template: templateRef },
        height: "auto",
        width: "50vw"
      });
    } else {
      this.actionType = type;
      this.transferForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Transfer", template: templateRef },
        height: "auto",
        width: "50vw"
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
          text: this.transferData[index].name ? this.transferData[index].name : ""
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

}
