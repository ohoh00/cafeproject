import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shop: any
  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }
  headers:any = {'authorization': this.ls.get('user').token}
  addShop(shop){
    return this.http.post<any>('http://localhost:3000/shops/addshop',shop,{headers:this.headers}).pipe(map( data => {
      return data
    }))
  }

  getShop(id){
    return this.http.get<any>(`http://localhost:3000/shops/getshop/${id}`,{headers:this.headers}).pipe(map( data => {
      if(data){
        this.shop = data
        console.log(data)
      }
      return this.shop
    }))
  }
  getShopOw(id){
    return this.http.get<any>(`http://localhost:3000/shops/getshopow/${id}`,{headers:this.headers}).pipe(map( data => {
      if(data){
        this.shop = data
        console.log(data)
      }
      return this.shop
    }))
  }

  getAllShops(){
      return this.http.get<any>('http://localhost:3000/shops/getshop',{headers:this.headers}).pipe
      (map(data => {
        if(data){
          this.shop = data
          console.log(data)
        }
        return this.shop
      }))
  }
  
}
