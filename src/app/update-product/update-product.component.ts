
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../category/category.model';
import { LastDataEntrComponent } from '../last-data-entr/last-data-entr.component';
import { homeApi } from '../last-data-entr/lastDataEntry';
import { categoryApi } from '../productentry/categoryApi';
import { Product } from '../productentry/productenty.model';


@Component({
  selector: 'update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  providers: [LastDataEntrComponent,homeApi,categoryApi],
})
@Injectable()
export class UpdateProductComponent {
    constructor(private http: HttpClient, private route:ActivatedRoute ,private deneme:LastDataEntrComponent,
    private categoryApi: categoryApi,
    ) {}

  idd:any;
  selectedUnit!: string;
  x:string | undefined = "";
  selectedCategory!: string;
  filteredProducts: Product[] | undefined;
  selectedCategoryId: string | undefined;
  private url = environment.dataBaseUrl;
  // categoryi almak için oluşturuldu veri tabanındaki alıp içine atıyoruz
  categories:Category[]=[];
  products:Product[]=[];
      ///
      adet!: number;
      miktarR!: number;;
      selectedProduct!: string;
      price2!: number;
      marka2!: string;
      tarihc!: any;
      girinname!: string;
      depo2!: string;

      ///


  unitChanged() {
    console.log(this.selectedUnit);
  }
  filterByCategory(categoryId: string) {
    this.categoryApi.filterProductsByCategory(categoryId).subscribe(filteredProducts => {
      this.filteredProducts = filteredProducts;
    });
  }

  updateProductOnServer(    name: HTMLInputElement,
    date: HTMLInputElement,
    depo: HTMLSelectElement,
    price: HTMLInputElement,
    miktar: HTMLInputElement,
    kategori: HTMLSelectElement,
    adetkg: HTMLInputElement,
    productName: HTMLInputElement,
    marka: HTMLInputElement,
    selectedUnit: string) {


    this.http
      .put(this.url + 'productentry/' + this.idd + '.json', {

        name: name.value,
        date: date.value,
        depo: depo.value,
        price: price.value,
        miktar: miktar.value,
        kategori: kategori.value,
        adetkg: adetkg.value,
        pName: productName.value,
        marka: marka.value,
      direction: 'giriş',

        birim: selectedUnit,
        total: parseInt(price.value) * parseInt(adetkg.value),

      })
      .subscribe((response) => {
        console.log(response);
      });
      let productUrl = this.url;



      this.http
      .get(productUrl + depo.value + '/' + productName.value + '.json')
      .subscribe((response: any) => {
        if (
          response &&
          response.name == productName.value &&
          response.depo == depo.value
        ) {
          // yeni algo azılmak zorunda !
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
            })
          } else {
            console.log('yok');
          }
        });


}

  updateProduct(id: string) {
    console.log(id);

    this.http
      .get(this.url + 'productentry/' + id + '.json')
      .subscribe((productEntry: any) => {
        console.log(productEntry);

        this.selectedProduct = productEntry.pName;
        this.miktarR = productEntry.miktar;
        this.adet = productEntry.adetkg;
        this.price2 = productEntry.price;
        this.marka2 = productEntry.marka;
        this.selectedCategoryId  = productEntry.kategori;
        this.tarihc = productEntry.date;
        this.girinname = productEntry.name;
        this.depo2=productEntry.depo;
      });
}
ngOnInit() {
  this.categoryApi.getCategories().subscribe((data)=>{
    this.categories=data;
  })
  this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id);
      this.idd=id;
      this.updateProduct(id!);
  });
}
}
