import { Injectable } from '@angular/core'
import { LocalStorageService } from 'angular-web-storage'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
interface customerData{
  result:any
}
@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  Id: any
  user: any
  customer: any
  email: string
  phone: string
  name: string
  point: number
  isLoggedin: boolean = true
  URL = 'http://localhost:3000/'
  constructor(private http: HttpClient, private local: LocalStorageService) {

  }

  addCustomer(user){
    return this.http.post<any>('http://localhost:3000/customer/signup', user)
  }
  getCustomer(id){
    const headers = {'authorization': this.local.get('user').token}
    return this.http.get<any>(`http://localhost:3000/customer/getCustomer/`+id,{headers}).pipe(map( data => {
      if(data){
        this.user = data

        return this.user
      }
      else{
        return false
      }
     
    }))
  }
  getAlluser(){const headers = {'authorization': this.local.get('user').token}
    return this.http.get<any>(`${this.URL}customer/getCustomer`,{headers}).pipe(
      map(data => {
        if(data){
          this.customer = data

        }
        return this.customer
      })
    )
  }
  login(user) {

    return this.http.post<customerData>('http://localhost:3000/customer/login', user).pipe(
      map(data => {

        if (data) {
          this.local.set('user', data, 1, 'w')
          console.log('write ', this.local.get('user'))
          this.isLoggedin = true
          this.email = data.result.email
          this.phone = data.result.phone
          this.name = data.result.name
          this.point = data.result.point
          this.Id = data.result.id
        }

        return data
      })
    )
  }
  getCustomerTel(phone){const headers = {'authorization': this.local.get('user').token}
    return this.http.get<any>(`http://localhost:3000/customer/getTel/${phone}`,{headers}).pipe(map( data => {
      if(data){
        console.log(phone)
        this.customer = data

        return this.customer
      }
      else{
        return false
      }
    }))
  }
  updateCustomer(newCustomer){
    const headers = {'authorization': this.local.get('user').token}
    return this.http.put<any>(`${this.URL}customer/updateCustomer`,newCustomer,{headers}).pipe(
      map(data => {
        return data
      })
    )
  }
  isLoggedIn() {
    return this.isLoggedin
  }
  getID() {
    return this.Id
  }
  getEmail() {
    return this.email
  }
  getPhone() {
    return this.phone
  }
  getName() {
    return this.name
  }
  getPoint() {
    return this.point
  }
}