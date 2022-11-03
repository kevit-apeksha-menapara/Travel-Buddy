import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  hotelForm;
  actionType;
  dialogRef;
  table: ITable = {
    rows: [
      {
        width: 25,
        type: "text",
        name: "Name",
        value: "name"
      },
      {
        width: 25,
        type: "text",
        name: "City",
        value: "city"
      },
      {
        width: 20,
        type: "text",
        name: "Contact Number",
        value: "contactNumber"
      },
      {
        width: 17,
        type: "text",
        name: "Cost",
        value: "cost"
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
  hotelData = [{
    name: "Hotel Udai Palace",
    city: "Udaipur",
    contactNumber: "999999999",
    cost: "10,000"
  },
  {
    name: "Hotel Pichola Haveli",
    city: "Udaipur",
    contactNumber: "999999999",
    cost: "6000"
  },
  {
    name: "Le Pension Kesar Vilas",
    city: "Udaipur",
    contactNumber: "999999999",
    cost: "4000"
  }];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.hotelForm = new FormGroup({
      "name": new FormControl("",Validators.required),
      "contactNumber": new FormControl("",Validators.required),
      "address": new FormControl("",Validators.required),
      "city": new FormControl("",Validators.required),
      "state": new FormControl("",Validators.required),
      "pincode": new FormControl("",Validators.required),
      "latitude": new FormControl(""),
      "longitude": new FormControl(""),
      "cost": new FormControl("",Validators.required)
    })
  }

  onAction({type,index},templateRef?) {
    switch (type) {
      case "edit":
        this.openDialog(templateRef,"editHotel",index);
        break;
      case "delete":
        this.openDeleteDialog(index);
        break;
    }
  }

  openDialog(templateRef,type,index?){
    if (type === "editHotel") {
      this.actionType = type;
      this.hotelForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Hotel", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    } else {
      this.actionType = type;
      this.hotelForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Hotel", template: templateRef },
        height: "auto",
        width: "60vw"
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
          text: this.hotelData[index].name ? this.hotelData[index].name : ""
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
