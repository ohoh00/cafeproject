import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { LoginComponent } from './pages/login/login.component';
import { RegmemComponent } from './pages/regmem/regmem.component';
import { SlshopComponent } from './pages/slshop/slshop.component';
import { RegshopComponent } from './pages/regshop/regshop.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopinfoComponent } from './pages/shopinfo/shopinfo.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { OrderHComponent } from './pages/order-h/order-h.component';
import { PayComponent } from './pages/pay/pay.component';
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'login', component: LoginComponent},
  { path: 'regmem', component: RegmemComponent},
  { path: 'slshop', component: SlshopComponent},
  { path: 'regshop', component: RegshopComponent},
  { path: 'home', component: HomeComponent},
  { path: 'shopinfo', component: ShopinfoComponent},
  { path: 'summary', component: SummaryComponent },
  { path: 'orderh', component: OrderHComponent },
  { path: 'pay', component: PayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
