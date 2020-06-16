import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {OrderService} from '../../service/order.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  Sum : any = 0
  OrderList: any[]
  OrderSlelct:any
  shop:any


  orderForm = new FormGroup({
    id:new FormControl('',[Validators.required]),
    paymentMethod : new FormControl('',[Validators.required]),
    customerPhoneNumber: new FormControl('')
  })
  
  constructor(private os: OrderService,private ls : LocalStorageService) {
    this.shop = ls.get('shop').name.id
    this.os.getAllOrders(this.shop).subscribe( data => {
      this.OrderList = data
      this.OrderSlelct = this.OrderList[0].menu
      this.Sum = this.OrderList[0].totalPrice
      console.log('hello',this.OrderList)
    })
    

  }

  
  ngOnInit(): void {
    
  }
  getOrders(){
    this.os.getAllOrders(this.shop).subscribe( data => {
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
  Pay(){
    const payload = {
    id:this.orderForm.get('id').value,
    paymentStatus:true,
    paymentDate:new Date(),
    paymentMethod:this.orderForm.get('paymentMethod').value,
    customerPhoneNumber:this.orderForm.get('customerPhoneNumber').value
    }
    console.log(payload)
    this.os.updateOrder(payload).subscribe( data => {

     alert('Payment updated.')
     this.reset()
     this.getOrders()

    },err => {
      console.log('Payment is failed to update.\n Err:',err)
    })
    
  }
  reset(){
    this.orderForm.reset()
  }


}
