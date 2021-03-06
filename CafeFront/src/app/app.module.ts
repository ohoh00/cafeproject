import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http"
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegmemComponent } from './pages/regmem/regmem.component';
import { SlshopComponent } from './pages/slshop/slshop.component';
import { RegshopComponent } from './pages/regshop/regshop.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FuncbarComponent } from './pages/funcbar/funcbar.component';
import { ShopinfoComponent } from './pages/shopinfo/shopinfo.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { OrderHComponent } from './pages/order-h/order-h.component';
import { PayComponent } from './pages/pay/pay.component';
import { ManagemenuComponent } from './pages/managemenu/managemenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeComponent } from './pages/employee/employee.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ManageingrtComponent } from './pages/manageingrt/manageingrt.component';
import { OrderComponent } from './pages/order/order.component';
import { ChartModule } from 'angular2-chartjs';

import {AuthGuardService} from './service/auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { QueueComponent } from './pages/queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegmemComponent,
    SlshopComponent,
    RegshopComponent,
    HomeComponent,
    MenuComponent,
    FuncbarComponent,
    ShopinfoComponent,
    SummaryComponent,
    OrderHComponent,
    PayComponent,
    ManagemenuComponent,
    EmployeeComponent,
    CustomerComponent,
    ManageingrtComponent,
    OrderComponent,
    NotFoundComponent,
    PromotionComponent,
    QueueComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
