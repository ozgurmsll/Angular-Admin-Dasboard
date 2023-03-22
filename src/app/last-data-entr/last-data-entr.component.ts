import { HttpClient } from '@angular/common/http';
import {
  AfterContentChecked,
  Component,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { productentry } from '../productentry/productenty.model';
import { productout } from '../productoutput/productoutput.model';
import { homeApi } from './lastDataEntry';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'last-data-entr',
  templateUrl: './last-data-entr.component.html',
  styleUrls: ['./last-data-entr.component.scss'],
  providers: [homeApi],
})
@Injectable()
export class LastDataEntrComponent {
  nameInput: any;
  priceInput: any;
  adetkgInput: any;
  descriptionInput: any;
  constructor(
    private http: HttpClient,
    private homeapi: homeApi,
    private router: Router,
    private toastrService: ToastrService

  ) {}

  [key: string]: any;

  private url = environment.dataBaseUrl;
  productEntries!: productentry[];
  x: any;
  productoutput: productout[] = [];
  productoutputMedi: productout[] = [];
  displayedColumns: string[] = [
    'no',
    'name',
    'Ürün',
    'date',
    'adetkg',
    'price',
    'action',
  ];
  datasource!: MatTableDataSource<productentry>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
   ip!: string

  deleteProductEntry(id: any) {
    console.log(id);


    this.http
      .delete(this.url + 'productentry/' + id + '.json')
      .subscribe((response) => {
        this.toastrService.warning('Ürün Silindi');
      });
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  updateProduct(id: string) {
    console.log(id);

    this.http
      .get(this.url + 'productentry/' + id + '.json')
      .subscribe((productEntry: any) => {
        console.log(productEntry);

        this['no'].value = productEntry.name;
        this.priceInput.value = productEntry.price;
        this.adetkgInput.value = productEntry.adetkg;
        this.descriptionInput.value = productEntry.description;
      });

    this.router.navigate(['update-product/' + id ]);
  }
  ngOnInit(): void {
    this.homeapi.getprodut().subscribe((data) => {
      this.productEntries = data;
      this.productEntries.forEach((category, index) => {
        this.productEntries[index]['no'] = index + 1;
      });
      this.datasource = new MatTableDataSource<productentry>(
        this.productEntries
      );

      this.datasource.paginator = this.paginator;
    });
    this.homeapi.getprodut2().subscribe((data) => {
      this.productoutput = data;
    });
    this.homeapi.getprodut3().subscribe((data) => {
      this.productoutputMedi = data;
    });
  }
}
