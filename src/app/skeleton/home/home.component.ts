import { HttpClient } from '@angular/common/http';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { apiServices } from 'src/app/productentry/producEntryApiServices';
import { environment } from 'src/environments/environment.prod';
import { homeApi } from '../../last-data-entr/lastDataEntry';

@Component({
  selector: 'x-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [apiServices, homeApi],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  constructor(
    private elementRef: ElementRef,
    private apiService: apiServices,
    private http: HttpClient,
    private homeapi: homeApi,
    private router: Router
  ) {}
  disDepototal: number = 0;
  Merkeztotal: number = 0;
  livtotal: number = 0;
  medicaltotal: number = 0;
  //------ barcharttttt
  //medicalpark
  medicelKategori: number = 0;
  etTavukBalik: number = 0;
  tatliMedical: number = 0;
  sütveSütÜrünleri: number = 0;
  kahvaltılık: number = 0;
  içecek: number = 0;
  kağıtGrubu: number = 0;
  meyveSebze: number = 0;
  //livhospital
  medicelKategori1: number = 0;
  etTavukBalik1: number = 0;
  tatliMedical1: number = 0;
  sütveSütÜrünleri1: number = 0;
  kahvaltılık1: number = 0;
  içecek1: number = 0;
  kağıtGrubu1: number = 0;
  meyveSebze1: number = 0;
  private url = environment.dataBaseUrl;
  //------------------------------------------------
  Temelgida: number = 0;
  etTavukBalik2: number = 0;
  tatliMedical2: number = 0;
  sütveSütÜrünleri2: number = 0;
  kahvaltılık2: number = 0;
  içecek2: number = 0;
  kağıtGrubu2: number = 0;
  meyveSebze2: number = 0;
  //livhospital
  Temelgida2: number = 0;
  etTavukBalik12: number = 0;
  tatliMedical12: number = 0;
  sütveSütÜrünleri12: number = 0;
  kahvaltılık12: number = 0;
  içecek12: number = 0;
  kağıtGrubu12: number = 0;
  meyveSebze12: number = 0;
  //-------------------------------------------------------------------
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
  };
  public radarChartLabels: string[] = [
    'Temel Gıda',
    'Et-Tavuk-Balık',
    'Süt ve Süt Ürünleri',
    'Tatlı',
    'Kahvaltılık',
    'İçecek',
    'Kağıt Grubu',
    'Meyve-Sebze',
  ];

  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    {
      data: [
        this.Temelgida,
        this.etTavukBalik2,
        this.sütveSütÜrünleri2,
        this.tatliMedical2,
        this.kahvaltılık2,
        this.içecek2,
        this.kağıtGrubu2,
        this.meyveSebze2,
      ],
      label: 'Merkez Depo',
    },
    {
      data: [
        this.Temelgida2,
        this.etTavukBalik12,
        this.sütveSütÜrünleri12,
        this.tatliMedical12,
        this.kahvaltılık12,
        this.içecek12,
        this.kağıtGrubu12,
        this.meyveSebze12,
      ],
      label: 'Dış Depo',
    },
  ];

  //bar chart----------------------------------------------------------
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Temel Gıda',
      'Et-Tavuk-Balık',
      'Süt ve Süt Ürünleri',
      'Tatlı',
      'Kahvaltılık',
      'İçecek',
      'Kağıt Grubu',
      'Meyve-Sebze',
    ],
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngAfterContentChecked(): void {
    this.barChartData = {
      labels: [
        'Temel Gıda',
        'Et-Tavuk-Balık',
        'Süt ve Süt Ürünleri',
        'Tatlı',
        'Kahvaltılık',
        'İçecek',
        'Kağıt Grubu',
        'Meyve-Sebze',
      ],
      datasets: [
        {
          data: [
            this.medicelKategori,
            this.etTavukBalik,
            this.sütveSütÜrünleri,
            this.tatliMedical,
            this.kahvaltılık,
            this.içecek,
            this.kağıtGrubu,
            this.meyveSebze,
          ],
          label: 'MedicalPark',
        },
        {
          data: [
            this.medicelKategori1,
            this.etTavukBalik1,
            this.sütveSütÜrünleri1,
            this.tatliMedical1,
            this.kahvaltılık1,
            this.içecek1,
            this.kağıtGrubu1,
            this.meyveSebze1,
          ],
          label: 'Liv Hospital',
        },
      ],
    };
    // radar chart
    this.radarChartDatasets = [
      {
        data: [
          this.Temelgida,
          this.etTavukBalik2,
          this.sütveSütÜrünleri2,
          this.tatliMedical2,
          this.kahvaltılık2,
          this.içecek2,
          this.kağıtGrubu2,
          this.meyveSebze2,
        ],
        label: 'Merkez Depo',
      },
      {
        data: [
          this.Temelgida2,
          this.etTavukBalik12,
          this.sütveSütÜrünleri12,
          this.tatliMedical12,
          this.kahvaltılık12,
          this.içecek12,
          this.kağıtGrubu12,
          this.meyveSebze12,
        ],
        label: 'Dış Depo',
      },
    ]


  }

  ngOnInit(): void {
    this.http.get(this.url + 'DışDepo.json').subscribe((response: any) => {
      let totalPrice = 0;
      for (let key in response) {
        totalPrice = response[key].average * response[key].adetkg + totalPrice;
      }
      this.disDepototal = totalPrice;
    });
    this.http.get(this.url + 'MerkezDepo.json').subscribe((response: any) => {
      let totalPrice = 0;
      for (let key in response) {
        totalPrice = response[key].average * response[key].adetkg + totalPrice;
      }
      this.Merkeztotal = totalPrice;
    });
    this.http.get(this.url + 'Liv.json').subscribe((response: any) => {
      let totalPrice = 0;
      for (let key in response) {
        totalPrice += response[key].total;
      }
      this.livtotal = totalPrice;
    });
    this.http.get(this.url + 'Medical.json').subscribe((response: any) => {
      let totalPrice = 0;
      for (let key in response) {
        totalPrice += response[key].total;
      }
      this.medicaltotal = totalPrice;
    });
    this.http.get(this.url + 'Medical.json').subscribe((response: any) => {
      let totalPrice = 0;
      let totalPrice1 = 0;
      let totalPrice4 = 0;
      let totalPrice2 = 0;
      let totalPrice5 = 0;
      let totalPrice6 = 0;
      let totalPrice7 = 0;
      let totalPrice8 = 0;

      for (let key in response) {
        if (response[key].kategori == 'Temel Gıda') {
          totalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Et - Tavuk - Balık') {
          totalPrice1 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Tatlı') {
          totalPrice4 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Süt ve Süt Ürünleri') {
          totalPrice2 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Kahvaltılık') {
          totalPrice5 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'İçecek') {
          totalPrice6 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Kağıt Grubu') {
          totalPrice7 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Meyve - Sebze') {
          totalPrice8 += response[key].total;
        }
      }
      this.meyveSebze = totalPrice8;
      this.kağıtGrubu = totalPrice7;
      this.içecek = totalPrice6;
      this.kahvaltılık = totalPrice5;
      this.sütveSütÜrünleri = totalPrice2;
      this.tatliMedical = totalPrice4;
      this.etTavukBalik = totalPrice1;
      this.medicelKategori = totalPrice;
    });
    this.http.get(this.url + 'Liv.json').subscribe((response: any) => {
      let totalPrice = 0;
      let totalPrice1 = 0;
      let totalPrice4 = 0;
      let totalPrice2 = 0;
      let totalPrice5 = 0;
      let totalPrice6 = 0;
      let totalPrice7 = 0;
      let totalPrice8 = 0;

      for (let key in response) {
        if (response[key].kategori == 'Temel Gıda') {
          totalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Et - Tavuk - Balık') {
          totalPrice1 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Tatlı') {
          totalPrice4 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Süt ve Süt Ürünleri') {
          totalPrice2 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Kahvaltılık') {
          totalPrice5 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'İçecek') {
          totalPrice6 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Kağıt Grubu') {
          totalPrice7 += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].kategori == 'Meyve - Sebze') {
          totalPrice8 += response[key].total;
        }
      }
      this.meyveSebze1 = totalPrice8;
      this.kağıtGrubu1 = totalPrice7;
      this.içecek1 = totalPrice6;
      this.kahvaltılık1 = totalPrice5;
      this.sütveSütÜrünleri1 = totalPrice2;
      this.tatliMedical1 = totalPrice4;
      this.etTavukBalik1 = totalPrice1;
      this.medicelKategori1 = totalPrice;
    });
    // ------productentry-----radarchart-----MerkezDepo-----
    this.http.get(this.url+'productentry.json').subscribe((response:any)=>{
      let TemeltotalPrice=0;
      let meyveSebzeTotalPrice=0;
      let kağıtGrubuTotalPrice=0;
      let kahvaltılıkTotalPrice=0;
      let icecekTotalPrice=0;
      let etTavukBalik2TotalPrice=0;
      let sütveSütÜrünleri2TotalPrice=0;
      let tatlı2TotalPrice=0;
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Temel Gıda') {
          TemeltotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Meyve - Sebze') {
          meyveSebzeTotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Kağıt Grubu') {
          kağıtGrubuTotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Kahvaltılık') {
          kahvaltılıkTotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'İçecek') {
          icecekTotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Et - Tavuk - Balık') {
          etTavukBalik2TotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Süt ve Süt Ürünleri') {
          sütveSütÜrünleri2TotalPrice += response[key].total;
        }
      }
      for (let key in response) {
        if (response[key].depo == 'MerkezDepo' && response[key].kategori == 'Tatlı') {
          tatlı2TotalPrice += response[key].total;
        }
      }
      this.tatliMedical2=tatlı2TotalPrice;
      this.sütveSütÜrünleri2=sütveSütÜrünleri2TotalPrice;
      this.Temelgida=TemeltotalPrice;
      this.meyveSebze2=meyveSebzeTotalPrice;
      this.kağıtGrubu2=kağıtGrubuTotalPrice;
      this.kahvaltılık2=kahvaltılıkTotalPrice;
      this.içecek2=icecekTotalPrice;
      this.etTavukBalik2=etTavukBalik2TotalPrice;
    });
//------------------productentry-----radarchart----------DışDepo
this.http.get(this.url+'productentry.json').subscribe((response:any)=>{
  let TemeldtotalPrice=0;
  let meyveSebzedTotalPrice=0;
  let kağıtGrubudTotalPrice=0;
  let kahvaltılıkdTotalPrice=0;
  let icecekdTotalPrice=0;
  let etTavukBalikdTotalPrice=0;
  let sütveSütÜrünleridTotalPrice=0;
  let tatlıdTotalPrice=0;
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'Temel Gıda') {
      TemeldtotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo'  && response[key].kategori == 'Meyve - Sebze') {
      meyveSebzedTotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'Kağıt Grubu') {
      kağıtGrubudTotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'Kahvaltılık') {
      kahvaltılıkdTotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'İçecek') {
      icecekdTotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'Et - Tavuk - Balık') {
      etTavukBalikdTotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'Süt ve Süt Ürünleri') {
      sütveSütÜrünleridTotalPrice += response[key].total;
    }
  }
  for (let key in response) {
    if (response[key].depo == 'DışDepo' && response[key].kategori == 'Tatlı') {
      tatlıdTotalPrice += response[key].total;
    }
  }
  this.tatliMedical12=tatlıdTotalPrice;
  this.sütveSütÜrünleri12=sütveSütÜrünleridTotalPrice;
  this.Temelgida2=TemeldtotalPrice;
  this.meyveSebze12=meyveSebzedTotalPrice;
  this.kağıtGrubu12=kağıtGrubudTotalPrice;
  this.kahvaltılık12=kahvaltılıkdTotalPrice;
  this.içecek12=icecekdTotalPrice;
  this.etTavukBalik12=etTavukBalikdTotalPrice;
});



    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }
}
