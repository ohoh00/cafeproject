import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }
 

  addEmployee(employee){const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}employees/signup`,employee,{headers}).pipe(
      map(data =>{
        return data
      })
    )
  }

  getEmployee(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}employees/getEmployee`,{headers}).pipe(
      map(data => {
        if(data){
          this.employee = data

        }
        return this.employee
      })
    )
  }

  getEmployeeShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/employees/getEmployeeShop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.employee = data
      }
      return this.employee
    }))
  }
  deleteitem(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.delete(`${this.URL}employees/delete/${id}`,{headers});
  }
}
