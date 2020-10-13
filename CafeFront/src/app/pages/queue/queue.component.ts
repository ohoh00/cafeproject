import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service'
import {LocalStorageService} from 'angular-web-storage'
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  bills : any
  OrderList: any[] = []
  shopname : any
  shop: any
  constructor(private os: OrderService,private ls : LocalStorageService) {
    this.bills = 0
    this.shop = this.ls.get('shop').id
    this.shopname = this.ls.get('shop').name
    console.log("1")
    this.os.getAllOrdersDone(this.shop,'false').subscribe( data => {
      data.forEach(element => {
         var item = {
           _id:element._id
          ,customerPhoneNumber:element.customerPhoneNumber
          ,paymentDate:element.paymentDate
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
    console.log("2")
    this.bills = 0
   }

  ngOnInit(): void {
    console.log("3")
    this.onLoading()
  }
  onLoading() {
    console.log("4")
    try {
      this.os.getAllOrdersDone(this.shop,'false').subscribe(
        data => {
          this.OrderList = data; 
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
    this.bills = 0
  }
  UpdateDone(id){
    console.log("5")
    console.log(id)
    const donepass = {
      id:id,
      done:true
    }
    console.log(id)
    this.os.updateOrderDone(donepass).subscribe(
      data => {
   
        this.onLoading()
      },
      err =>{
        console.log(err);
    });
  }
  bill(x){
    console.log("6")
    this.bills = x
    console.log(x)
    console.log(this.bills)
  }
}
