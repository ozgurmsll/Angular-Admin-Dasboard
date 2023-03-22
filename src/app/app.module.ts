import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './skeleton/home/home.component';
import { SidebarComponent } from './skeleton/sidebar/sidebar.component';
import { HeaderComponent } from './skeleton/header/header.component';
import { CategoryComponent } from './category/category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './product/product.component';
import { ProductentryComponent } from './productentry/productentry.component';
import { ProductoutputComponent } from './productoutput/productoutput.component';
import { StockstatusComponent } from './stockstatus/stockstatus.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UpdateProductComponent } from './update-product/update-product.component';
import { LastDataEntrComponent } from './last-data-entr/last-data-entr.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './stockstatus/filter.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    CategoryComponent,
    ProductComponent,
    ProductentryComponent,
    ProductoutputComponent,
    StockstatusComponent,
    UpdateProductComponent,
    LastDataEntrComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    AuthenticationModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
      MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      progressBar:true,
      timeOut:2000,


    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
