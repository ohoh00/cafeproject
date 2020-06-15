import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {


  Orders = [
    {o_name:'ลาเต้',o_quantity:1,o_price:50 },
    {o_name:'ชาเย็น',o_quantity:1,o_price:50},
    {o_name:'ชาเขียว',o_quantity:1,o_price:60},
    {o_name:'ไมโล',o_quantity:1,o_price:50},
    {o_name:'เอสเพรสโซ่',o_quantity:1,o_price:60},
  ]

  OrderCount: any[] = this.Orders;
  OrderList: any[] = this.OrderCount;
  
  constructor() {}

  ngOnInit(): void {
  }
  
  SumPrice() {
    var i = 0;
    var sumPrice = 0;
    for (i; i < this.Orders.length; i++){
      sumPrice += this.Orders[i].o_price;
    }
    return sumPrice
  }


}
