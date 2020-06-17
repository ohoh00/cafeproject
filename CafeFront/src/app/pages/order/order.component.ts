import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../service/menu.service'
import {OrderService} from'../../service/order.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  menu:any
  selectMenu:any[] = []
  shop:String
  constructor(private ms:MenuService,private os:OrderService,private ls : LocalStorageService) { 
    this.shop = this.ls.get('shop').id
  }

  ngOnInit(): void {
    this.ms.getMenuShop( this.shop).subscribe( data => {
      this.menu = data
      console.log(this.menu)
    })
  }

  addMenu(selMenu){
     this.selectMenu.push(selMenu)
     console.log(this.selectMenu)
  }
  deletSelect(index){
    this.selectMenu.splice(index,1)
    console.log(this.selectMenu)
  }
  deleteAllSelect(){
    this.selectMenu = []
    console.log(this.selectMenu)
  }
  SumPrice(order:any) {
    var i = 0;
    var sumPrice = 0;
    for (i; i < order.length; i++){
      sumPrice += order[i].price;
    }
    return sumPrice
  }
  saveOrder(){
    if(this.isMenuEmpty()){
      return alert('No menu selected!.') 
    }
    const payload = {
        menu:this.selectMenu,quantity:this.selectMenu.length,paymentDate:'',paymentStatus:false,paymentMethod:'',customerPhoneNumber:'',totalPrice:this.SumPrice(this.selectMenu),shop:this.shop
    }
   
    this.os.addOrder(payload).subscribe(data => {
      alert('Order added.')
      this.deleteAllSelect()
    },err => {
      console.log(err)
    })
  
  }
  isMenuEmpty(){
    return this.selectMenu.length === 0 ? true : false
  }

}
