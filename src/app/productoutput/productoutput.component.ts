import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../authentication/auth.service';
import { Category } from '../category/category.model';
import { categoryApi } from '../productentry/categoryApi';
import { apiServices } from '../productentry/producEntryApiServices';
import { Product } from '../productentry/productenty.model';

@Component({
  selector: 'app-productoutput',
  templateUrl: './productoutput.component.html',
  styleUrls: ['./productoutput.component.scss'],
  providers: [apiServices, categoryApi,AuthService],
})
export class ProductoutputComponent {
private url = environment.dataBaseUrl;

  constructor(
    private http: HttpClient,
    private categoryApi: categoryApi,
    private route: ActivatedRoute,
    private register:AuthService,
    private toastrService:ToastrService

  ) {
    this.selectedUnit = 'kg';
    const data = this.register.getItem('user');
    const dataObject = JSON.parse(data??"{}");
    this.x=dataObject.email;

  }
  selectedUnit: string;
  x:string | undefined = "";

  unitChanged() {
    console.log(this.selectedUnit);
  }

  categories: Category[] = [];
  products: Product[] = [];
  output(
    name: HTMLInputElement,
    date: HTMLInputElement,
    depo: HTMLSelectElement,
    miktar: HTMLInputElement,
    kategori: HTMLSelectElement,
    adetkg: HTMLInputElement,
    productName: HTMLSelectElement,
    marka: HTMLInputElement,
    selectedUnit: string,
    konum:HTMLSelectElement
  ){
    this.toastrService.success("Ürün Çıkışı Başarıyla Yapıldı","Başarılı")

    this.http.get(this.url+depo.value+'/'+productName.value+'.json').subscribe((data: any) => {
      if (data.hasOwnProperty('average')) {
        let productentry = {
          name: name,
          date: date.value,
          depo: depo.value,
          price: data.average.toFixed(2),
          miktar: miktar.value,
          kategori: kategori.value,
          adetkg: adetkg.value,
          pName: productName.value,
          marka: marka.value,
          birim: selectedUnit,
          konum:konum.value,
          tarih: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
          total: parseInt((parseFloat(data.average) * parseFloat(adetkg.value)).toFixed(2)),
          direction: 'Çıkış',
        };
        this.http.post(this.url+konum.value +'.json',productentry).subscribe((response) => {
          console.log(response);
        });
      } else {
        alert('Bu ürününün ortalama fiyatında veya ürünün varlığında bir sorun var.Veritananına kayıt yapılamadı');
      }
    });
    let productUrl = this.url;
    this.http
      .get(productUrl + depo.value + '/' + productName.value + '.json')
      .subscribe((response: any) => {
        if (
          response &&
          response.name === productName.value &&
          response.depo === depo.value
        ) {
          let adetkgInt = parseInt(response.adetkg);
          let adetkgValueInt = parseInt(adetkg.value);
          adetkgInt -= adetkgValueInt;

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
        }
      });
  }
  filterByCategory(categoryId: string) {
    this.categoryApi.filterProductsByCategory(categoryId).subscribe(filteredProducts => {
      this.filteredProducts = filteredProducts;
    });
  }
  filteredProducts: Product[] | undefined;
  selectedCategoryId: string | undefined;
  ngOnInit() {
    // kategorileri çekiyoruz ve içine atıyoruz
    this.categoryApi.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.categoryApi.getProduct().subscribe((data) => {
      this.products = data;
    });

  }
}
