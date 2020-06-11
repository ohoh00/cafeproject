import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms'
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
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
