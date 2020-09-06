import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import {OrderService} from '../../service/order.service'
import {CustomerService} from '../../service/customer.service'
import {PromotionService} from '../../service/promotion.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-pay' ,
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  Sum : number = 0
  OrderList: any
  OrderSelect:any
  shop:any
  customer : any
  customerId : any
  name: string
  customerPoint: number = 0
  promotionList: any
  promotionName : String
  promotionPoint : number = 0
  promotionDiscount: number = 0
  Sumex : number = 0

  orderForm = new FormGroup({
    id:new FormControl('',[Validators.required]),
    paymentMethod : new FormControl('',[Validators.required]),
    customerPhoneNumber: new FormControl('',[Validators.pattern('[0-9]{10}')]),
    promotion: new FormControl('ไม่ได้ใช้โปรโมชั่น',[])
  })
  
  constructor(private os: OrderService,private cs: CustomerService,private ls : LocalStorageService,private pr : PromotionService) {
    this.shop = this.ls.get('shop').id
    console.log(this.shop)
    this.os.getAllOrders(this.shop).subscribe( data => {
      this.OrderList = data
      this.OrderSelect = this.OrderList[0].menu
      this.Sum = this.OrderList[0].totalPrice
      this.Sumex = this.Sum
      this.orderForm.get('id').setValue(this.OrderList[0]._id)
    })
    this.pr.getPromotionShop(this.shop).subscribe( data => {
      this.promotionList = data
      console.log(this.promotionList)
    })
    

  }

  
  ngOnInit(): void {
    this.orderForm.get('id').setValue(this.OrderList[0]._id)
  }
  
  getCustomerTel(){
    this.name = ''
    this.customerPoint = 0
    this.cs.getCustomerTel(this.shop,this.orderForm.get('customerPhoneNumber').value).subscribe( data => {
      this.customer = data[0]
      this.customerId = this.customer._id
      this.name = this.customer.name.toString()
      this.customerPoint = this.customer.point
      console.log(this.customerId)
    })
    var Sumall = this.Sum
    var Discount = this.promotionDiscount
    this.Sumex = Sumall-(Sumall*(Discount/100))
    
  }

  getPromotionShop(){
    this.pr.getPromotionShop(this.shop).subscribe( data => {
      this.promotionList = data
    
    })
    console.log(this.promotionList)
  }

  getOrders(){
    this.os.getAllOrders(this.shop).subscribe( data => {
      this.OrderList = data
    
    })
  }
  selectPromotion(x){
    this.orderForm.get('promotion').setValue(this.promotionList[x].name)
    this.promotionPoint = this.promotionList[x].point
    this.promotionDiscount = this.promotionList[x].discount
    console.log(this.promotionPoint)
    console.log(this.promotionDiscount)
    console.log(this.orderForm.get('promotion').value)
    console.log(x)
  }
  resetPromotion(){
    this.promotionName = "ไม่ใช้โปรโมชั่น"
    this.promotionPoint = 0
    console.log(this.promotionName)
    console.log(this.promotionPoint)
  }
  
  onChange(value){
    console.log(value)
    this.OrderSelect = this.OrderList[value].menu
    this.orderForm.get('id').setValue(this.OrderList[value]._id)
 
    this.Sum = this.OrderList[value].totalPrice
    this.Sumex = this.Sum
  }
  Pay(){
    if(!this.orderForm.valid){
   
      return alert('Payment form is not valid')
    }
    const payload = {
    id:this.orderForm.get('id').value,
    paymentStatus:true,
    paymentDate:new Date(),
    paymentMethod:this.orderForm.get('paymentMethod').value,
    customerPhoneNumber:this.orderForm.get('customerPhoneNumber').value,
    promotion:this.orderForm.get('promotion').value,
    totalPrice:this.Sumex
    }
    console.log(payload)
    this.os.updateOrder(payload).subscribe( data => {
    
     alert('Payment updated.')
     this.reset()
     this.getOrders()

    },err => {
      console.log('Payment is failed to update.\n Err:',err)
    })

    const changepoint = {
      id:this.customerId,
      point: this.customerPoint-this.promotionPoint
    }
    console.log(changepoint)
    this.cs.updateCustomer(changepoint).subscribe( data => {
      
      this.reset()
    },err => {
      console.log('Point is failed to update.\n Err:',err)
    })
  }
  reset(){
    this.orderForm.reset()
  }

  
  
  
  get customerPhoneNumber(){
    return this.orderForm.get('customerPhoneNumber');
  }

  get paymentMethod(){
    return this.orderForm.get('paymentMethod');
  }


}
