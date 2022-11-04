import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
// import { NotifyService } from 'app/services/notify.service';
import { HotelService } from 'app/services/hotel.service';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  @ViewChild("deleteTemplate", { static: false })
  isDeleteTemplateRef: TemplateRef<any>;
  hotelForm;
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
  // hotelData = [{
  //   name: "Hotel Udai Palace",
  //   city: "Udaipur",
  //   contactNumber: "999999999",
  //   cost: "10,000"
  // },
  // {
  //   name: "Hotel Pichola Haveli",
  //   city: "Udaipur",
  //   contactNumber: "999999999",
  //   cost: "6000"
  // },
  // {
  //   name: "Le Pension Kesar Vilas",
  //   city: "Udaipur",
  //   contactNumber: "999999999",
  //   cost: "4000"
  // }];
  hotelData = [];
  actionType;
  editIndex;
  deleteIndex;
  deleteData: any;

  constructor(private dialog: MatDialog,
    private hotelService: HotelService,
    // private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getHotel();
  }

  initForm() {
    this.hotelForm = new FormGroup({
      "name": new FormControl("" || this.hotelData[this.editIndex]?.name, Validators.required),
      "contactNumber": new FormControl("" || this.hotelData[this.editIndex]?.contactNumber, Validators.required),
      "address": new FormControl("" || this.hotelData[this.editIndex]?.address, Validators.required),
      "city": new FormControl("" || this.hotelData[this.editIndex]?.city, Validators.required),
      "state": new FormControl("" || this.hotelData[this.editIndex]?.state, Validators.required),
      "pincode": new FormControl("" || this.hotelData[this.editIndex]?.pincode, Validators.required),
      "latitude": new FormControl("" || this.hotelData[this.editIndex]?.latitude),
      "longitude": new FormControl("" || this.hotelData[this.editIndex]?.longitude),
      "cost": new FormControl("" || this.hotelData[this.editIndex]?.cost, Validators.required)
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
        this.deleteData = this.hotelData[index].name ? this.hotelData[index].name : "";
        break;
    }
  }

  openDialog(templateRef, type) {
    if (type === "addHotel") {
      this.actionType = type;
      this.hotelForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Hotel", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "edit") {
      this.initForm();
      this.actionType = type;
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Hotel", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "delete") {
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: {
          title: "Delete Hotel",
          template: this.isDeleteTemplateRef,
        },
        height: "auto",
        width: "45vw"
      });
    }
  }

  getHotel() {
    this.hotelService
      .getHotel()
      .then((res: any) => {
        this.hotelData = res;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        // this.notificationService.sendNotification(
        //   "error", 
        //   err.error && err.error.message ? err.error.message : "Something went wrong!");
      });
  }

  addHotel() {
    this.dialog.closeAll();
    if (this.actionType === "addHotel") {
      this.hotelService
        .addHotel({ ...this.hotelForm.value })
        .then(() => {
          this.getHotel();
          // this.notificationService.sendNotification("success", "Hotel Created Successfully!");
        })
        .catch(err => {
          console.log(err);
          // this.notificationService.sendNotification(
          //   "error",
          //   err.error && err.error.description ? err.error.description : "Something went wrong!"
          // );
        });
    } else {
      this.hotelService
        .editHotel(this.hotelData[this.editIndex].id, { ...this.hotelForm.value })
        .then(() => {
          this.getHotel();
          // this.notificationService.sendNotification("success", "Hotel Updated Successfully!");
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

  onDeleteHotel() {
    this.hotelService
      .deleteHotel(this.hotelData[this.deleteIndex].id)
      .then(() => {
        // this.notificationService.sendNotification("success", "Hotel has been deleted successfully!");
        this.getHotel();
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
