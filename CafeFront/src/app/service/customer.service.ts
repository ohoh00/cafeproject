import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {LocalStorageService} from 'angular-web-storage'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: any
  URL = 'http://localhost:3000/'
 
  
  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }
  

  addCustomer(customer){const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}customers/signup`,customer,{headers}).pipe(
      map(data =>{
        return data
      })
    )
  }

  getAlluser(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}customers/getCustomer`,{headers}).pipe(
      map(data => {
        if(data){
          this.customer = data
          console.log(data)
        }
        return this.customer
      })
    )
  }

  getCustomerShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/customers/getCustomerShop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.customer = data
        console.log(data)
      }
      return this.customer
    }))
  }
  deleteitem(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.delete(`${this.URL}customers/delete/${id}`,{headers});
  }
}
