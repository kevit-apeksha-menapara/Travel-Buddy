import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
import { PlaceService } from 'app/services/place.service';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  placeForm;
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
        name: "Cost for Adult",
        value: "costAdult"
      },
      {
        width: 17,
        type: "text",
        name: "Cost for Kid",
        value: "costKid"
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
  placeData = [{
    name: "City Palace Udaipur",
    city: "Udaipur",
    costAdult: "30",
    costKid: "10"
  },
  {
    name: "Museum of Folk Art",
    city: "Udaipur",
    costAdult: "100",
    costKid: "50"
  },
  {
    name: "City Palace Udaipur",
    city: "Udaipur",
    costAdult: "30",
    costKid: "10"
  }];

  constructor(private dialog: MatDialog,
              private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeForm = new FormGroup({
      "name": new FormControl("",Validators.required),
      "contactNumber": new FormControl("",Validators.required),
      "address": new FormControl("",Validators.required),
      "city": new FormControl("",Validators.required),
      "state": new FormControl("",Validators.required),
      "pincode": new FormControl("",Validators.required),
      "latitude": new FormControl(""),
      "longitude": new FormControl(""),
      "costAdult": new FormControl("",Validators.required),
      "costKid": new FormControl("",Validators.required) 
    })
  }

  onAction({type,index},templateRef?) {
    switch (type) {
      case "edit":
        this.openDialog(templateRef,"editPlace",index);
        break;
      case "delete":
        this.openDeleteDialog(index);
        break;
    }
  }

  openDialog(templateRef,type,index?){
    if (type === "editPlace") {
      this.actionType = type;
      this.placeForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Place", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    } else {
      this.actionType = type;
      this.placeForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Place", template: templateRef },
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
          text: this.placeData[index].name ? this.placeData[index].name : ""
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

  addPlace(){
    console.log("clicked");
    this.dialog.closeAll();
    console.log(this.placeForm.value);
    if(this.actionType == "addPlace"){
      this.placeService
        .postPlace({...this.placeForm.value})
        .then(() => {
          console.log("success");
          // this._notificationService.sendNotification("success", "Usecase Created Successfully!");
        })
        .catch(err => {
          console.log(err);
          // this._notificationService.sendNotification(
          //   "error",
          //   err.error && err.error.description ? err.error.description : "Something went wrong!"
          // );
        });
    }
  }

}
