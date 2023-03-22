import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { apiServices } from './producEntryApiServices';
import { initializeApp } from 'firebase/app';

import { categoryApi } from './categoryApi';
import { Category } from '../category/category.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Product } from './productenty.model';
import { HeaderComponent } from '../skeleton/header/header.component';

import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productentry',
  templateUrl: './productentry.component.html',
  styleUrls: ['./productentry.component.scss'],

  providers: [apiServices, categoryApi, HeaderComponent, AuthService],
})
export class ProductentryComponent {
  constructor(
    private http: HttpClient,
    private apiService: apiServices,
    private categoryApi: categoryApi,
    private route: ActivatedRoute,
    private nav: HeaderComponent,
    private register: AuthService,
    private toastrService: ToastrService
  ) {
    this.selectedUnit = 'kg';
    const data = this.register.getItem('user');
    const dataObject = JSON.parse(data ?? '{}');
    this.x = dataObject.email;
  }

  user: User | null | undefined;
  x: string | undefined = '';
  selectedCategory!: string;
  filteredProducts: Product[] | undefined;
  selectedCategoryId: string | undefined;
  private url = environment.dataBaseUrl;
  // categoryi almak için oluşturuldu veri tabanındaki alıp içine atıyoruz
  categories: Category[] = [];
  products: Product[] = [];
  selectedUnit: string;

  unitChanged() {
    console.log(this.selectedUnit);
  }

  filterByCategory(categoryId: string) {
    this.categoryApi
      .filterProductsByCategory(categoryId)
      .subscribe((filteredProducts) => {
        this.filteredProducts = filteredProducts;
      });
  }
  addentr(
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
    this.toastrService.success('Ürün Girişi Başarıyla Yapıldı', 'Başarılı');

    //---------------yeni Ürün ekleme-----------------//
    this.apiService.addentr(
      name,
      date,
      depo,
      price,
      miktar,
      kategori,
      adetkg,
      productName,
      marka,
      selectedUnit
    );
    // işlem bittikden sonra inputlar resetlensin
  }

  ngOnInit() {
    // kategorileri çekiyoruz ve içine atıyoruz
    this.categoryApi.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
