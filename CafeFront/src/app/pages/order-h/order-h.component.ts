import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-order-h',
  templateUrl: './order-h.component.html',
  styleUrls: ['./order-h.component.scss']
})
export class OrderHComponent implements OnInit {
 
  Sum : any = 0
  OrderList: any
  OrderSlelct: any

  orderForm = new FormGroup({
    id:new FormControl('',[Validators.required]),
  })
  constructor(private os: OrderService) { 
    this.os.getAllOrders().subscribe( data => {
      this.OrderList = data
      this.OrderSlelct = this.OrderList[0].menu
      console.log('hello',this.OrderList)
    })
  }

  ngOnInit(): void {
    this.os.getAllOrders().subscribe( data => {
      this.OrderList = data
      console.log('hello',this.OrderList)
    })
  }
  onChange(value){
    this.OrderSlelct = this.OrderList[value].menu
    this.orderForm.get('id').setValue(this.OrderList[value]._id)
    console.log(this.OrderSlelct)
    this.Sum = this.OrderList[value].totalPrice
  }
  getOrders(){
    this.os.getAllOrders().subscribe( data => {
      this.OrderList = data
      console.log('hello',this.OrderList)
    })
  }

}
