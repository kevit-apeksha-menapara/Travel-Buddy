import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPlace } from "app/utils/model/place";

@Injectable({
    providedIn: 'root',
  })
  
export class PlaceService {
    placeServiceUrl = 'localhost:3000/place';

    constructor(private http: HttpClient) {}

    getPlace(){
        return this.http.get<IPlace[]>(this.placeServiceUrl);
    }

    postPlace(object:IPlace){
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
}

