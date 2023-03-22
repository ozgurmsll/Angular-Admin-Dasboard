import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { ProductTotal } from "../productentry/productenty.model";




@Injectable(
)

export class stokapi {
  constructor(private http:HttpClient) {}
  private url = environment.dataBaseUrl;
  productotal: ProductTotal[] = [];

  // filterProductsByCategory(categoryId: string): Observable<Product[]> {
  //   return this.getProduct().pipe(
  //     map(products => products.filter(product => product.categoryId === categoryId))
  //   );
  // }
  productstock():Observable<ProductTotal[]>{
    return this.http.get<ProductTotal[]>(this.url+'DışDepo.json').pipe(
      map((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this.productotal.push(data[key]);
          }
        }
        console.log(this.productotal);

        return this.productotal;
      })
    );


}

}
