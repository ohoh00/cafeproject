import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import {OrderService} from '../../service/order.service'
import {CustomerService} from '../../service/customer.service'
import {PromotionService} from '../../service/promotion.service'
import {LocalStorageService} from 'angular-web-storage'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-pay' ,
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})

export class PayComponent implements OnInit  {
  Sum : number = 0
  OrderList: any
  OrderSelect:any
  shop:any
  promptpay:any
  customer : any
  customerId : any
  name: string
  customerTelUse: any
  customerPoint: number = 0
  promotionList: any
  promotionName : String
  promotionPoint : number = 0
  promotionDiscount: number = 0
  Sumex : number = 0
  qrcodePrice : any
 
  svg : String 
  data : any

  orderForm = new FormGroup({
    id:new FormControl('',[Validators.required]),
    paymentMethod : new FormControl('',[Validators.required]),
    customerPhoneNumber: new FormControl('',[Validators.pattern('[0-9]{10}')]),
    promotion: new FormControl('ไม่ได้ใช้โปรโมชั่น',[])
  })
  
  constructor(private os: OrderService,private cs: CustomerService,private ls : LocalStorageService,private pr : PromotionService,private sanitizer: DomSanitizer) {
    this.shop = this.ls.get('shop').id
    this.promptpay = this.ls.get('shop').promptpay
    //this.data = this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" shape-rendering="crispEdges"><path fill="#f7f8f7" d="M0 0h41v41H0z"/><path stroke="#003b6a" d="M4 4.5h7m1 0h1m1 0h2m1 0h1m1 0h1m2 0h2m4 0h1m1 0h7M4 5.5h1m5 0h1m4 0h1m1 0h2m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h1m1 0h4m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h2m2 0h1m2 0h3m5 0h1m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h3m2 0h1m2 0h2m1 0h1m2 0h3m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h2m1 0h1m3 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m2 0h1m1 0h1m3 0h1m1 0h6M4 12.5h1m3 0h1m1 0h3m1 0h1m3 0h2m7 0h1m1 0h5m2 0h1M4 13.5h1m1 0h1m5 0h3m1 0h1m1 0h1m2 0h1m1 0h1m4 0h1m2 0h2m1 0h1M7 14.5h7m2 0h3m1 0h1m1 0h2m1 0h1m4 0h2m2 0h1M6 15.5h2m3 0h1m2 0h1m2 0h1m1 0h2m2 0h1m1 0h3m3 0h1m1 0h1M5 16.5h2m1 0h3m2 0h5m1 0h2m2 0h1m2 0h1m1 0h1m2 0h2m2 0h2M4 17.5h1m2 0h1m3 0h1m4 0h1m1 0h1m3 0h3m3 0h2m2 0h1m1 0h3M4 18.5h2m3 0h3m1 0h1m1 0h3m1 0h1m1 0h1m2 0h3m1 0h1m2 0h4M6 19.5h3m4 0h2m1 0h1m2 0h3m3 0h2m4 0h4M4 20.5h1m2 0h1m2 0h1m1 0h1m1 0h3m1 0h1m3 0h4m3 0h1m1 0h1m2 0h3M5 21.5h1m2 0h2m2 0h4m2 0h1m3 0h4m2 0h4m1 0h4M7 22.5h1m1 0h3m2 0h2m4 0h2m2 0h4m1 0h3m1 0h1M4 23.5h2m1 0h3m1 0h3m2 0h4m1 0h6m4 0h3m2 0h1M4 24.5h1m4 0h3m1 0h1m3 0h1m1 0h1m2 0h1m1 0h1m2 0h3m2 0h1m1 0h3M4 25.5h1m4 0h1m2 0h2m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m3 0h2m1 0h1m1 0h3M7 26.5h4m1 0h1m2 0h2m3 0h2m1 0h1m2 0h2m4 0h3M8 27.5h2m2 0h3m1 0h1m4 0h1m1 0h5m1 0h1m2 0h2m1 0h1M4 28.5h2m3 0h4m1 0h1m3 0h3m1 0h1m1 0h1m1 0h1m1 0h5m3 0h1M12 29.5h7m1 0h3m2 0h2m1 0h1m3 0h1M4 30.5h7m1 0h1m2 0h1m2 0h3m1 0h1m4 0h2m1 0h1m1 0h4M4 31.5h1m5 0h1m2 0h1m2 0h5m5 0h1m1 0h1m3 0h2M4 32.5h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h1m1 0h1m5 0h1m1 0h6m1 0h1M4 33.5h1m1 0h3m1 0h1m2 0h3m1 0h1m4 0h3m3 0h4m1 0h1m1 0h2M4 34.5h1m1 0h3m1 0h1m2 0h1m1 0h5m1 0h1m2 0h4m3 0h4M4 35.5h1m5 0h1m7 0h4m3 0h3m4 0h1m2 0h1M4 36.5h7m1 0h2m2 0h1m1 0h1m3 0h4m4 0h2m2 0h3"/></svg>')
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
  async getQRcode(phone){
    const qrcode = require('qrcode')
    const generatePayload = require('promptpay-qr') 

    const amount = this.Sumex
    const payload = generatePayload(phone,{ amount })
    
    console.log(payload)
    const options = { type: 'svg', color: { dark: '#4287f5', light: '#ffffff' } }
    return await qrcode.toString(payload,options,(err,svg) => {
      if(err) return -1
      console.log(svg)
      this.data = this.sanitizer.bypassSecurityTrustHtml(svg)
      
    })
  }
  getCustomerTel(){
    this.name = ''
    var qrtel =''
    this.customerPoint = 0
    this.cs.getCustomerTel(this.shop,this.orderForm.get('customerPhoneNumber').value).subscribe( data => {
      this.customer = data[0]
      console.log(this.customer)
      this.customerId = this.customer._id
      this.customerTelUse = this.customer.phoneNumber
      console.log(this.customerTelUse)
      this.name = this.customer.name.toString()
      this.customerPoint = this.customer.point
      console.log(this.customerId)
      
      qrtel = qrtel + this.customerTelUse.substr(0, 3) + "-"
      qrtel = qrtel + this.customerTelUse.substr(3, 3) + "-"
      qrtel = qrtel + this.customerTelUse.substr(6, 4) 
 
      console.log(qrtel)
      var Sumall = this.Sum
      var Discount = this.promotionDiscount
  
      this.Sumex = Sumall-(Sumall*(Discount/100))

      this.getQRcode(qrtel)
    })

   
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
