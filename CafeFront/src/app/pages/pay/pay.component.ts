import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  Orders = [
    {o_name:'ลาเต้',o_type:'ร้อน',o_quantity:1,o_price:50 },
    {o_name:'ชาเย็น',o_type:'เย็น',o_quantity:1,o_price:50},
    {o_name:'ชาเขียว',o_type:'ปั่น',o_quantity:1,o_price:60},
    {o_name:'ไมโล',o_type:'เย็น',o_quantity:1,o_price:50},
    {o_name:'เอสเพรสโซ่',o_type:'ร้อน',o_quantity:1,o_price:60},
  ]
  Orders2 = [
    {o_name:'ลาเต้',o_type:'ร้อน',o_quantity:1,o_price:50 },
    {o_name:'ชาชัก',o_type:'เย็น',o_quantity:1,o_price:50},
    {o_name:'ชาเขียว',o_type:'ร้อน',o_quantity:1,o_price:160},
    {o_name:'ไมโล',o_type:'ร้อน',o_quantity:1,o_price:50},
    {o_name:'เอสเพรสโซ่',o_type:'ร้อน',o_quantity:1,o_price:60},
  ]

  Sum : any = 0
  OrderList: any
  OrderSlelct:any
  
  constructor() {
    this.OrderList = [this.Orders,this.Orders2]
  }

  ngOnInit(): void {
  }
  
  SumPrice(order:any) {
    var i = 0;
    var sumPrice = 0;
    for (i; i < order.length; i++){
      sumPrice += order[i].o_price;
    }
    return this.Sum = sumPrice
  }

  onChange(value){
    this.OrderSlelct = this.OrderList[value]
    console.log(value)
    this.SumPrice(this.OrderSlelct)
  }


}
