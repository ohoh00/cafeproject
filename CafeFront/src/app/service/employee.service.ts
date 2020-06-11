import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  addEmployee(employee){
    return this.http.post<any>(`${this.URL}/employees/signup`,employee).pipe(
      map(data =>{
        return data
      })
    )
  }

  getEmployee(id){
    return this.http.get<any>(`${this.URL}/employees/getEmployee/${id}`).pipe(
      map(data => {
        if(data){
          this.employee = data
          console.log(data)
        }
        return this.employee
      })
    )
  }
}
