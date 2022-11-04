import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
// import { NotifyService } from 'app/services/notify.service';
import { PlaceService } from 'app/services/place.service';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  @ViewChild("deleteTemplate", { static: false })
  isDeleteTemplateRef: TemplateRef<any>;
  placeForm;
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
  // placeData = [{
  //   name: "City Palace Udaipur",
  //   city: "Udaipur",
  //   costAdult: "30",
  //   costKid: "10"
  // },
  // {
  //   name: "Museum of Folk Art",
  //   city: "Udaipur",
  //   costAdult: "100",
  //   costKid: "50"
  // },
  // {
  //   name: "City Palace Udaipur",
  //   city: "Udaipur",
  //   costAdult: "30",
  //   costKid: "10"
  // }];
  placeData = [];
  actionType;
  editIndex;
  deleteIndex;
  deleteData: any;

  constructor(private dialog: MatDialog,
    private placeService: PlaceService,
    // private notificationService: NotifyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getPlace();
  }

  initForm() {
    this.placeForm = new FormGroup({
      "name": new FormControl("" || this.placeData[this.editIndex]?.name, Validators.required),
      "contactNumber": new FormControl("" || this.placeData[this.editIndex]?.contactNumber, Validators.required),
      "address": new FormControl("" || this.placeData[this.editIndex]?.address, Validators.required),
      "city": new FormControl("" || this.placeData[this.editIndex]?.city, Validators.required),
      "state": new FormControl("" || this.placeData[this.editIndex]?.state, Validators.required),
      "pincode": new FormControl("" || this.placeData[this.editIndex]?.pincode, Validators.required),
      "latitude": new FormControl("" || this.placeData[this.editIndex]?.latitude),
      "longitude": new FormControl("" || this.placeData[this.editIndex]?.longitude),
      "costAdult": new FormControl("" || this.placeData[this.editIndex]?.costAdult, Validators.required),
      "costKid": new FormControl("" || this.placeData[this.editIndex]?.costKid, Validators.required)
    });
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
        this.deleteData = this.placeData[index].name ? this.placeData[index].name : "";
        break;
    }
  }

  openDialog(templateRef, type) {
    if (type === "addPlace") {
      this.actionType = type;
      this.placeForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Place", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "edit") {
      this.initForm();
      this.actionType = type;
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Place", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "delete") {
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: {
          title: "Delete Place",
          template: this.isDeleteTemplateRef,
        },
        height: "auto",
        width: "45vw"
      });
    }
  }

  getPlace() {
    this.placeService
      .getPlace()
      .then((res: any) => {
        this.placeData = res;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        // this.notificationService.sendNotification(
        //   "error", 
        //   err.error && err.error.message ? err.error.message : "Something went wrong!");
      });
  }

  addPlace() {
    this.dialog.closeAll();
    if (this.actionType === "addPlace") {
      this.placeService
        .addPlace({ ...this.placeForm.value })
        .then(() => {
          this.getPlace();
          // this.notificationService.sendNotification("success", "Place Created Successfully!");
        })
        .catch(err => {
          console.log(err);
          // this.notificationService.sendNotification(
          //   "error",
          //   err.error && err.error.description ? err.error.description : "Something went wrong!"
          // );
        });
    } else {
      this.placeService
        .editPlace(this.placeData[this.editIndex].id, { ...this.placeForm.value })
        .then(() => {
          this.getPlace();
          // this.notificationService.sendNotification("success", "Place Updated Successfully!");
        })
        .catch(err => {
          console.log(err);
          // this.notificationService.sendNotification(
          //   "error",
          //   err.error && err.error.description ? err.error.description : "Something went wrong!"
          // );
        });
      this.editIndex = null;
    }
  }

  onCancel() {
    this.dialog.closeAll();
  }

  onDeletePlace() {
    this.placeService
      .deletePlace(this.placeData[this.deleteIndex].id)
      .then(() => {
        // this.notificationService.sendNotification("success", "Place has been deleted successfully!");
        this.getPlace();
      })
      .catch(err => {
        // this.notificationService.sendNotification(
        //   "error",
        //   err.error && err.error.message ? err.error.message : "Something went wrong!"
        // );
        this.deleteIndex = null;
      });

  }
}
