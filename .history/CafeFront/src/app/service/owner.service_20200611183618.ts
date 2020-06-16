import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  user: any
  constructor(private http : HttpClient) { }

  addOwner(user){
    return this.http.post<any>('http://localhost:3000/owner/signup',user).pipe(map( data => {
      return data
    }))
  }

  getOwner(id){
    return this.http.get<any>(`http://localhost:3000/owner/getOwner/5ee0c0b8d729342b30a2e1d9`).pipe(map( data => {
      if(data){
        this.user = data
        console.log(data)
        return this.user
      }
      else{
        return false
      }
     
    }))
  }
  login(user){
    return this.http.post('http://localhost:3000/owner/login',user).pipe(
      map(data=>{
        console.log(data)
        return data
      })
    )
  }
}
