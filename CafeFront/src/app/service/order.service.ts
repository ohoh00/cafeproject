import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order : any
  URL = 'http://localhost:3000'

  constructor(private http : HttpClient) { }

  addOrder(order){
    return this.http.post<any>(`${this.URL}/orders/addOrder`,order).pipe(
      map(data => {
        console.log(data)
        return data
      })
    )
  }
  updateOrder(newOrder){
    return this.http.put<any>(`${this.URL}/orders/updateOrder`,newOrder).pipe(
      map(data => {
        return data
      })
    )
  }

  getOrder(id,shop){
    return this.http.get<any>(`${this.URL}/orders/getdOrder/${shop}/${id}`).pipe(
      map(data => {
        if(data){
          this.order = data
          console.log(data)
        }
        return this.order
      })
    )
  }
  getAllOrders(shop,paymentstatus=false){
    return this.http.get<any>(`${this.URL}/orders/getOrder/${shop}/${paymentstatus}`,).pipe(
      map(data => {
        if(data){
          this.order = data
          console.log(data)
        }
        return this.order
      })
    )
  }



}
