import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegmemComponent } from './pages/regmem/regmem.component';
import { SlshopComponent } from './pages/slshop/slshop.component';
import { RegshopComponent } from './pages/regshop/regshop.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopinfoComponent } from './pages/shopinfo/shopinfo.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { OrderHComponent } from './pages/order-h/order-h.component';
import { PayComponent } from './pages/pay/pay.component';
import { ManagemenuComponent } from './pages/managemenu/managemenu.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ManageingrtComponent } from './pages/manageingrt/manageingrt.component';
import { OrderComponent } from './pages/order/order.component';
import {NotFoundComponent} from './pages/not-found/not-found.component'
import {AuthGuardService} from './service/auth-guard.service';
import { PromotionComponent } from './pages/promotion/promotion.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'regmem', component: RegmemComponent},
  { path: 'slshop', component: SlshopComponent,canActivate:[AuthGuardService]},
  { path: 'regshop', component: RegshopComponent,canActivate:[AuthGuardService]},
  { path: 'home', component: HomeComponent,canActivate:[AuthGuardService]},
  { path: 'shopinfo', component: ShopinfoComponent,canActivate:[AuthGuardService]},
  { path: 'summary', component: SummaryComponent,canActivate:[AuthGuardService] },
  { path: 'orderh', component: OrderHComponent,canActivate:[AuthGuardService] },
  { path: 'pay', component: PayComponent,canActivate:[AuthGuardService]},
  { path: 'summary', component: SummaryComponent,canActivate:[AuthGuardService]},
  { path: 'managemenu', component: ManagemenuComponent,canActivate:[AuthGuardService]},
  { path: 'employee', component: EmployeeComponent,canActivate:[AuthGuardService]},
  { path: 'customer', component: CustomerComponent,canActivate:[AuthGuardService]},
  { path: 'manageingrt', component: ManageingrtComponent,canActivate:[AuthGuardService]},
  { path: 'order', component: OrderComponent,canActivate:[AuthGuardService]},
  { path: 'promotion', component: PromotionComponent,canActivate:[AuthGuardService]},
  { path: '**', component: NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
