import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { apiServices } from '../productentry/producEntryApiServices';
import { ProductTotal } from '../productentry/productenty.model';
import { stokapi } from './stokapi';

@Component({
  selector: 'app-stockstatus',
  templateUrl: './stockstatus.component.html',
  styleUrls: ['./stockstatus.component.scss'],
  providers: [stokapi, apiServices],
})
export class StockstatusComponent {
  constructor(
    private stokapi: stokapi,
    private http: HttpClient,
    private apiServices: apiServices,
    private toastrService:ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  productotal: ProductTotal[] = [];
  x: ProductTotal[] = [];
  filter:string = '';
  productotalDis: ProductTotal[] = [];

  private url = environment.dataBaseUrl;

  ngOnInit(): void {
    // array dizisine cevirdik ve map fonk. ile içeri grdik ve keyleri aldık
    this.http.get(this.url + 'MerkezDepo.json').subscribe((response: any) => {
      const responseArray = Array.isArray(response) ? response : [response];
      responseArray.map((item: any) => {
        for (const key in item) {
          if (item[key].pName == item.name) {
            this.productotal.push({ ...item[key], id: key });
          }
        }
      });
    },(x)=>(err:HttpErrorResponse) => {
      this.toastrService.error('Hata','Bir hata oluştu')

      }
      );

      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 10030);


    this.http.get(this.url + 'DışDepo.json').subscribe({
      next: (response: any) => {
        const responseArray = Array.isArray(response) ? response : [response];
        responseArray.map((item: any) => {
          for (const key in item) {
            if (item[key].pName == item.name) {
              this.productotalDis.push({ ...item[key], id: key });
            }
          }

        });
      },error: (err:HttpErrorResponse) => {
        console.log(err);



    }})




}
}
