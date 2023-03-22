import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { Category } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(private http: HttpClient,private toastrService:ToastrService) {}
  private url = environment.dataBaseUrl;
  category: Category | undefined;
  id = 0;

  add(kategoriAdi: HTMLInputElement, kategoriAciklama: HTMLTextAreaElement) {
    // //veri tabanından kategoriler bölümündeki kategoriler çekilir.
    // this.http.get(this.url + 'categories.json').subscribe((response) => {
    //   //gelen veri object olarak gelir. Object.values ile array'e çevirilir ve responseArray değişkenine atanır.Kaç tane obje olduğu bulunur.
    //   const responseArray = Object.values(response);

    //   const maxId = Math.max(...responseArray.map((item) => item.id));
    //   //maxId değişkeni ile yeni id oluşturulur.
    //   this.id = maxId + 1;
    //   //firebase sdk ile yeni bulunan max id ile gelen kategori adı ve açıklaması firebase veri tabanına kaydedilir.
    //   const firebaseConfig = {
    //     databaseURL: 'x',
    //   };
    //   const app = initializeApp(firebaseConfig);

    //   const database = getDatabase(app);
    //   const db = getDatabase();
    //   set(ref(db, 'categories/' + this.id), {
    //     id: this.id,
    //     name: kategoriAdi.value,
    //     description: kategoriAciklama.value,
    //   });
    // });
    const firebaseConfig = {
      databaseURL: 'x',
    };
    const app = initializeApp(firebaseConfig);
    this.toastrService.success("Kategori Başarıyla Eklendi","Başarılı")

    const database = getDatabase(app);
    const db = getDatabase();
    set(ref(db, 'categories/'+ kategoriAdi.value), {
          name: kategoriAdi.value,
          description: kategoriAciklama.value,
        });
        kategoriAdi.value="";
        kategoriAciklama.value="";
  }
  }

