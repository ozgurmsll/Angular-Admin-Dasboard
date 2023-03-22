import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { Injectable } from '@angular/core';
import { ProductTotal } from './productenty.model';
import { Router } from '@angular/router';

@Injectable()
export class apiServices {
  constructor(private http: HttpClient,private route:Router ) {}
  private url = environment.dataBaseUrl;
  productotal: ProductTotal[] = [];



  async addentr(

    name: HTMLInputElement,
    date: HTMLInputElement,
    depo: HTMLSelectElement,
    price: HTMLInputElement,
    miktar: HTMLInputElement,
    kategori: HTMLSelectElement,
    adetkg: HTMLInputElement,
    productName: HTMLSelectElement,
    marka: HTMLInputElement,
    selectedUnit: string
  ) {
    //---------------Ürün ekleme-----------------//
    let input = document.getElementById('name') as HTMLInputElement;

    let productentry = {
      name: name.value,
      date: date.value,
      depo: depo.value,
      price: price.value,
      miktar: miktar.value,
      kategori: kategori.value,
      adetkg: adetkg.value,
      pName: productName.value,
      marka: marka.value,
      birim: selectedUnit,

      total: parseInt(price.value) * parseInt(adetkg.value),
      tarih: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      direction: 'giriş',
    };
    //productentry.json'a verileri gönderiyoruz.
     this.http
      .post(this.url + 'productentry.json', productentry)
      .subscribe((response) => {
        console.log(response);
      });



    //---------------Depo stok durumu ve kontrol kısmı-----------------//
    let productUrl = this.url;



      this.http
      .get(productUrl + depo.value + '/' + productName.value + '.json')
      .subscribe((response: any) => {
        if (
          response &&
          response.name == productName.value &&
          response.depo == depo.value
        ) {
          let adetkgInt = parseInt(response.adetkg);
          let adetkgValueInt = parseInt(adetkg.value);
          adetkgInt += adetkgValueInt;

          let totalentry = {
            name: productName.value,
            adetkg: adetkgInt,
            depo: depo.value,
            // average: sum/count,
          };
          this.http
            .patch(
              productUrl + depo.value + '/' + productName.value + '.json',
              totalentry
            )
            .subscribe((response) => {
              console.log(response);
            });
            this.http
            .get(this.url + 'productentry.json')
            .subscribe((response: any) => {
              let totalPrice = 0;
              let entryCount = 0;
              for (let key in response) {
                if (response[key].pName == productName.value){

                  totalPrice  +=  parseInt(response[key].total);
                  entryCount+= parseInt(response[key].adetkg)
                }
              }
            
              let averagePrice = totalPrice / entryCount;

              this.http
                .patch(
                  this.url + depo.value + '/' + productName.value + '.json',
                  { average: averagePrice }
                )
                .subscribe(
                  (response) => {
                    console.log(response);
                  },
                  (error) => {
                    console.error(error);
                  }
                );
            });
        } else {
          let x=depo.value
          const firebaseConfig = {
            databaseURL: 'https://emtsamsunpark-default-rtdb.firebaseio.com/',
          };
          const app = initializeApp(firebaseConfig);
          const database = getDatabase(app);
          const db = getDatabase();
          set(ref(db, x + '/' + productName.value  ), {
            name: productName.value,
            adetkg: adetkg.value,
            depo: depo.value,

          });
        }
      });





}}
