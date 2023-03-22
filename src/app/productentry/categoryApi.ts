import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../category/category.model';
import { Product } from './productenty.model';
@Injectable()

export class categoryApi {
products:Product[]=[];

  constructor(private http: HttpClient) {}
  private url = environment.dataBaseUrl;
  // veri tabanındaki categoryleri çekiyoruz
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories.json').pipe(
      map((data) => {
        const categories: Category[] = [];
        for (const key in data) {
          categories.push({ ...data[key], id: key });
        }
        return categories;
      })
    );
  }
  //veri tabanındaki ürünleri çekiyoruz.
  getProduct(categoryId?:any): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'product.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          if(categoryId){
            if(categoryId==data[key].categoryId){
              products.push({ ...data[key], id: key });
            }

          }
          else{
            products.push({ ...data[key], id: key });

          }

          }

        return products;
      })
    );

  }

  filterProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.getProduct().pipe(
      map(products => products.filter(product => product.categoryId === categoryId))
    );
  }
}
