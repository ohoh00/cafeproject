import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { LoginComponent } from './pages/login/login.component';
import { RegmemComponent } from './pages/regmem/regmem.component';
import { SlshopComponent } from './pages/slshop/slshop.component';
import { RegshopComponent } from './pages/regshop/regshop.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FuncbarComponent } from './pages/funcbar/funcbar.component';
import { ShopinfoComponent } from './pages/shopinfo/shopinfo.component';
import { SummaryComponent } from './pages/summary/summary.component';
<<<<<<< HEAD
import { OrderHComponent } from './pages/order-h/order-h.component';
import { PayComponent } from './pages/pay/pay.component';
=======
import { ManagemenuComponent } from './pages/managemenu/managemenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
>>>>>>> 082e2ecd1040a8976657bbbef2fc45976590c9ed

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    LoginComponent,
    RegmemComponent,
    SlshopComponent,
    RegshopComponent,
    HomeComponent,
    MenuComponent,
    FuncbarComponent,
    ShopinfoComponent,
    SummaryComponent,
<<<<<<< HEAD
    OrderHComponent,
    PayComponent
=======
    ManagemenuComponent
>>>>>>> 082e2ecd1040a8976657bbbef2fc45976590c9ed
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
