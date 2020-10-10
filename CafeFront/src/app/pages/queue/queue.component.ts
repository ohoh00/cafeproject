import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {LocalStorageService} from 'angular-web-storage'
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  bills : 0
  OrderList: any[] = []
  shopname : any
  shop: any
  constructor(private os: OrderService,private ls : LocalStorageService) {
    this.shop = this.ls.get('shop').id
    this.shopname = this.ls.get('shop').name
    this.os.getAllOrdersDone(this.shop,'false').subscribe( data => {
      data.forEach(element => {
         var item = {
           _id:element._id
          ,customerPhoneNumber:element.customerPhoneNumber
          ,paymentDate:new Date(element.paymentDate).toLocaleString()
          ,paymentMethod:element.paymentMethod
          ,quantity:element.quantity
          ,totalPrice:element.totalPrice
          ,paymentStatus:element.paymentStatus
          ,menu:element.menu
          ,promotion:element.promotion
          ,done:element.done
          ,queue:element.queue
        }
        this.OrderList.push(item)
        console.log(item)
      });
     

    })
    this.bills = 0
   }

  ngOnInit(): void {
  }
  UpdateDone(id){
    const donepass = {
      id:id,
      done:true
    }
    console.log(id)
    this.os.updateOrderDone(donepass).subscribe(
      data => {
   
        alert('Order update done successfully');
      },
      err =>{
        console.log(err);
    });
    location.reload();
  }
  bill(i){
    this.bills = i
  }
}
