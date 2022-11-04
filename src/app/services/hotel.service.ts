import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IHotel } from "app/utils/model/hotel";

@Injectable({
  providedIn: 'root',
})

export class HotelService {
  hotelServiceUrl = 'http://localhost:4000/hotel';

  constructor(private http: HttpClient) { }

  getHotel() {
    return new Promise((resolve, reject) => {
      return this.http.get(this.hotelServiceUrl).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  addHotel(object: IHotel) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.hotelServiceUrl, object).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  editHotel(id, object: IHotel) {
    return new Promise((resolve, reject) => {
      return this.http.put(this.hotelServiceUrl + "/" + id, object).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteHotel(id) {
    return new Promise((resolve, reject) => {
      return this.http.delete(this.hotelServiceUrl + "/" + id).subscribe(
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

