import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order : any
  URL = 'http://localhost:3000'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }


  addOrder(order){
     const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}/orders/addOrder`,order,{headers}).pipe(
      map(data => {
        
        return data
      })
    )
  }
  updateOrder(newOrder){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.put<any>(`${this.URL}/orders/updateOrder`,newOrder,{headers}).pipe(
      map(data => {
        return data
      })
    )
  }
  updateOrderDone(done){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.put<any>(`${this.URL}/orders/updateOrderDone`,done,{headers}).pipe(
      map(data => {
        return data
      })
    )
  }

  getOrder(id,shop){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}/orders/getdOrder/${shop}/${id}`,{headers}).pipe(
      map(data => {
        if(data){
          this.order = data
          
        }
        return this.order
      })
    )
  }
  getAllOrders(shop,paymentstatus='false'){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}/orders/getOrder/${shop}/${paymentstatus}`,{headers}).pipe(
      map(data => {
        if(data){
          this.order = data
         
        }
        return this.order
      })
    )
  }
  getAllOrdersDone(shop,done='false'){
    const headers = {'authorization': this.ls.get('user').token}
    var orders = []
    return this.http.get<any>(`${this.URL}/orders/getOrderDone/${shop}/${done}`,{headers}).pipe(
      map(data => {
        if(data){
          data.forEach(element => {
            element.paymentDate = new Date(element.paymentDate).toLocaleString()
            orders.push(element)
          });
        }
        this.order = orders
        console.log(this.order)
        return this.order
      })
    )
  }
  getMenuFromOrders(shop,name){
    const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}/orders/findmenu/${shop}/${name}`,{headers}).pipe(
      map(data => {
        if(data){
          this.order = data

        }
        console.log(data)
        return this.order
      })
    )
  }



}
