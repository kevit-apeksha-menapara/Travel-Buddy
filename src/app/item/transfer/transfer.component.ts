import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/common-components/dialog/dialog.component';
// import { NotifyService } from 'app/services/notify.service';
import { TransferService } from 'app/services/transfer.service';
import { ITable } from 'app/utils/model/table.data';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @ViewChild("deleteTemplate", { static: false })
  isDeleteTemplateRef: TemplateRef<any>;
  transferForm;
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
  // transferData = [{
  //   name: "Rajkot to Udaipur",
  //   noOfKms: "475",
  //   charge: "15"
  // },
  // {
  //   name: "Udaipur to Jodhpur",
  //   noOfKms: "250",
  //   charge: "13"
  // }
  // ];
  transferData = [];
  actionType;
  editIndex;
  deleteIndex;
  deleteData: any;

  constructor(private dialog: MatDialog,
    private transferService: TransferService,
    // private notifyService: notifyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getTransfer();
  }

  initForm() {
    this.transferForm = new FormGroup({
      "name": new FormControl("" || this.transferData[this.editIndex]?.name, Validators.required),
      "source": new FormControl("" || this.transferData[this.editIndex]?.source, Validators.required),
      "destination": new FormControl("" || this.transferData[this.editIndex]?.destination, Validators.required),
      "noOfKms": new FormControl("" || this.transferData[this.editIndex]?.noOfKms, Validators.required),
      "charge": new FormControl("" || this.transferData[this.editIndex]?.charge, Validators.required)
    })
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
        this.deleteData = this.transferData[index].name ? this.transferData[index].name : "";
        break;
    }
  }

  openDialog(templateRef, type) {
    if (type === "addTransfer") {
      this.actionType = type;
      this.transferForm.reset();
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Add Transfer", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "edit") {
      this.initForm();
      this.actionType = type;
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: { title: "Edit Transfer", template: templateRef },
        height: "auto",
        width: "60vw"
      });
    }
    else if (type === "delete") {
      this.dialogRef = this.dialog.open(DialogComponent, {
        panelClass: "addUser",
        data: {
          title: "Delete Transfer",
          template: this.isDeleteTemplateRef,
        },
        height: "auto",
        width: "45vw"
      });
    }
  }

  getTransfer() {
    this.transferService
      .getTransfer()
      .then((res: any) => {
        this.transferData = res;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        // this.notificationService.sendNotification(
        //   "error", 
        //   err.error && err.error.message ? err.error.message : "Something went wrong!");
      });
  }

  addTransfer() {
    this.dialog.closeAll();
    if (this.actionType === "addTransfer") {
      this.transferService
        .addTransfer({ ...this.transferForm.value })
        .then(() => {
          this.getTransfer();
          // this.notificationService.sendNotification("success", "Transfer Created Successfully!");
        })
        .catch(err => {
          console.log(err);
          // this.notificationService.sendNotification(
          //   "error",
          //   err.error && err.error.description ? err.error.description : "Something went wrong!"
          // );
        });
    } else {
      this.transferService
        .editTransfer(this.transferData[this.editIndex].id, { ...this.transferForm.value })
        .then(() => {
          this.getTransfer();
          // this.notificationService.sendNotification("success", "Transfer Updated Successfully!");
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

  onDeleteTransfer() {
    this.transferService
      .deleteTransfer(this.transferData[this.deleteIndex].id)
      .then(() => {
        // this.notificationService.sendNotification("success", "Transfer has been deleted successfully!");
        this.getTransfer();
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
