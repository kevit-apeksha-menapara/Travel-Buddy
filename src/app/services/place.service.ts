import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPlace } from "app/utils/model/place";

@Injectable({
  providedIn: 'root',
})

export class PlaceService {
  placeServiceUrl = 'http://localhost:4000/place';

  constructor(private http: HttpClient) { }

  getPlace() {
    return new Promise((resolve, reject) => {
      return this.http.get(this.placeServiceUrl).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  addPlace(object: IPlace) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.placeServiceUrl, object).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  editPlace(id, object: IPlace) {
    return new Promise((resolve, reject) => {
      return this.http.put(this.placeServiceUrl + "/" + id, object).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deletePlace(id) {
    return new Promise((resolve, reject) => {
      return this.http.delete(this.placeServiceUrl + "/" + id).subscribe(
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

