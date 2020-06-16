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
    return this.http.get<any>(`http://localhost:3000/owner/getOwner/${id}`).pipe(map( data => {
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
}
