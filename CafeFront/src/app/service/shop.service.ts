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
  
  addShop(shop){const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>('http://localhost:3000/shops/addshop',shop,{headers}).pipe(map( data => {
      return data
    }))
  }

  getShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/shops/getshop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.shop = data
 
      }
      return this.shop
    }))
  }
  getShopOw(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/shops/getshopow/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.shop = data

      }
      return this.shop
    }))
  }

  getAllShops(){const headers = {'authorization': this.ls.get('user').token}
      return this.http.get<any>('http://localhost:3000/shops/getshop',{headers}).pipe
      (map(data => {
        if(data){
          this.shop = data

        }
        return this.shop
      }))
  }
  
}
