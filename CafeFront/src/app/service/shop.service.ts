import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shop: any
  constructor(private http : HttpClient) { }

  addShop(shop){
    return this.http.post<any>('http://localhost:3000/shops/addshop',shop).pipe(map( data => {
      return data
    }))
  }

  getShop(id){
    return this.http.get<any>(`http://localhost:3000/shops/getshop/${id}`).pipe(map( data => {
      if(data){
        this.shop = data
        console.log(data)
      }
      return this.shop
    }))
  }

  getAllShops(){
      return this.http.get<any>('http://localhost:3000/shops/getshop').pipe
      (map(data => {
        if(data){
          this.shop = data
          console.log(data)
        }
        return this.shop
      }))
  }
  
}
