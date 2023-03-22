import { HttpClient } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { apiServices } from "src/app/productentry/producEntryApiServices";
import { productentry } from "src/app/productentry/productenty.model";
import { environment } from "src/environments/environment.prod";
import { productout } from "../productoutput/productoutput.model";




@Injectable()

export class homeApi {
  constructor(private http:HttpClient) {}
  private url = environment.dataBaseUrl;
  productEntries: productentry[] = [];
  productoutput: productout[] = [];
  productoutputMedi: productout[] = [];


  getprodut(): Observable<productentry[]> {
    return this.http.get<[productentry]>(this.url + 'productentry.json').pipe(
      map((data) => {
        for (const key in data) {
          this.productEntries.push({ ...data[key], id: key } as productentry);
        }
        return this.productEntries;
      })
    );
  }
  getprodut2(): Observable<productout[]> {
    return this.http.get<[productout]>(this.url + 'Liv.json').pipe(
      map((data) => {
        for (const key in data) {
          this.productoutput.push({ ...data[key], id: key } as productout);
        }
        return this.productoutput;
      })
    );
  }
  getprodut3(): Observable<productout[]> {
    return this.http.get<[productout]>(this.url + 'Medical.json').pipe(
      map((data) => {
        for (const key in data) {
          this.productoutputMedi.push({ ...data[key], id: key } as productout);
        }
        return this.productoutputMedi;
      })
    );
  }

}
