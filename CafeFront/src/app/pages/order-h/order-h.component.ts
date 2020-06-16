import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/order.service'

@Component({
  selector: 'app-order-h',
  templateUrl: './order-h.component.html',
  styleUrls: ['./order-h.component.scss']
})
export class OrderHComponent implements OnInit {
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
  OrderSlelct: any
  
  constructor(private os: OrderService) { 
   
  }

  ngOnInit(): void {
    this.os.getAllOrders().subscribe( data => {
      this.OrderList = data
      console.log('hello',this.OrderList)
    })
  }
  onChange(value){
    this.OrderSlelct = this.OrderList[value]
    this.Sum = this.OrderList.totalPrice
  }

}
