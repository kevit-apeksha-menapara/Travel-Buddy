import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITransfer } from "app/utils/model/transfer";

@Injectable({
  providedIn: 'root',
})

export class TransferService {
  transferServiceUrl = 'http://localhost:4000/transfer';

  constructor(private http: HttpClient) { }

  getTransfer() {
    return new Promise((resolve, reject) => {
      return this.http.get(this.transferServiceUrl).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  addTransfer(object: ITransfer) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.transferServiceUrl, object).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  editTransfer(id, object: ITransfer) {
    return new Promise((resolve, reject) => {
      return this.http.put(this.transferServiceUrl + "/" + id, object).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteTransfer(id) {
    return new Promise((resolve, reject) => {
      return this.http.delete(this.transferServiceUrl + "/" + id).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}

