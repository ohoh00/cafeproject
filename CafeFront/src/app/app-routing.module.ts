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
<<<<<<< HEAD
import { ManageingrtComponent } from './pages/manageingrt/manageingrt.component';
=======
import { OrderComponent } from './pages/order/order.component';
>>>>>>> eceb86d841782b99ef8f6fe0dad4e96dd0428870

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'regmem', component: RegmemComponent},
  { path: 'slshop', component: SlshopComponent},
  { path: 'regshop', component: RegshopComponent},
  { path: 'home', component: HomeComponent},
  { path: 'shopinfo', component: ShopinfoComponent},
  { path: 'summary', component: SummaryComponent },
  { path: 'orderh', component: OrderHComponent },
  { path: 'pay', component: PayComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'managemenu', component: ManagemenuComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'customer', component: CustomerComponent},
<<<<<<< HEAD
  { path: 'manageingrt', component: ManageingrtComponent},

=======
  { path: 'order', component: OrderComponent}
>>>>>>> eceb86d841782b99ef8f6fe0dad4e96dd0428870
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
