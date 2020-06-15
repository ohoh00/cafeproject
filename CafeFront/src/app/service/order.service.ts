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
        return data
      })
    )
  }

  getOrder(id){
    return this.http.get<any>(`${this.URL}/orders/getOrder/${id}`).pipe(
      map(data => {
        if(data){
          this.order = data
          console.log(data)
        }
        return this.order
      })
    )
  }
  getAllOrders(){
    return this.http.get<any>(`${this.URL}/orders/getOrder`).pipe(
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
