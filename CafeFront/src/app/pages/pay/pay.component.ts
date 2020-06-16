import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {OrderService} from '../../service/order.service'

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {


  Sum : any = 0
  OrderList: any
  OrderSlelct:any
  
  constructor(private os: OrderService) {
    this.getOrders()
  }

  
  ngOnInit(): void {
    
  }
  getOrders(){
    this.os.getAllOrders().subscribe( data => {
      this.OrderList = data
      console.log('hello',this.OrderList)
    })
  }
  onChange(value){
    this.OrderSlelct = this.OrderList[value].menu
    console.log(this.OrderSlelct)
    this.Sum = this.OrderList[value].totalPrice
  }


}
