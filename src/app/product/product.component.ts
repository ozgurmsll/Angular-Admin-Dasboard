import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../category/category.model';
import { categoryApi } from '../productentry/categoryApi';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [categoryApi],

})
export class ProductComponent {
id: any;
constructor(private categoryApi:categoryApi,private http:HttpClient,private toastrService:ToastrService ){}
categories:Category[]=[];

add(urunadi: HTMLInputElement,deneme:HTMLSelectElement ) {

//veri tabanına ürün kaydı yapılır.
  const firebaseConfig = {
    databaseURL: 'x',
  };
  const app = initializeApp(firebaseConfig);
  this.toastrService.success("Ürün Başarıyla Eklendi","Başarılı")
  const database = getDatabase(app);
  const db = getDatabase();
  set(ref(db, 'product/'+urunadi.value), {
    categoryId: deneme.value,
    name: urunadi.value ,
  });
}



ngOnInit() {
  // kategorileri çekiyoruz ve içine atıyoruz sonrasında ngfor döngüsü ile html de gösteriyoruz.
  this.categoryApi.getCategories().subscribe((data)=>{
    this.categories=data;
  })
}
}
