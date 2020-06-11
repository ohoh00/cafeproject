import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  addCustomer(customer){
    return this.http.post<any>(`${this.URL}/customers/signup`,customer).pipe(
      map(data =>{
        return data
      })
    )
  }

  getUser(id){
    return this.http.get<any>(`${this.URL}/customers/getCustomer/${id}`).pipe(
      map(data => {
        if(data){
          this.customer = data
          console.log(data)
        }
        return this.customer
      })
    )
  }
}
