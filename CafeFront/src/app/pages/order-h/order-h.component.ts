import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-order-h',
  templateUrl: './order-h.component.html',
  styleUrls: ['./order-h.component.scss']
})
export class OrderHComponent implements OnInit {
 

  OrderList: any[] = []
  shop: any


  constructor(private os: OrderService,private ls : LocalStorageService) { 
    this.shop = this.ls.get('shop').id

    this.os.getAllOrders(this.shop,'true').subscribe( data => {
      data.forEach(element => {
         var item = {
          customerPhoneNumber:element.customerPhoneNumber
          ,paymentDate:new Date(element.paymentDate).toUTCString()
          ,paymentMethod:element.paymentMethod
          ,quantity:element.quantity
          ,totalPrice:element.totalPrice
          ,paymentStatus:element.paymentStatus
          ,menu:element.menu
        }
        this.OrderList.push(item)
      });
     

    })
  }

  ngOnInit(): void {
    
  }

}
