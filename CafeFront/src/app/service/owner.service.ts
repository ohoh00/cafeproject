import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-web-storage'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  user: any
  isLoggedin:boolean = true
  constructor(private http : HttpClient,private local : LocalStorageService) {

   }
//
  addOwner(user){
    
    return this.http.post<any>('http://localhost:3000/owner/signup',user)
  }

  getOwner(id){

    const headers = {'authorization': this.local.get('user').token}
    return this.http.get<any>(`http://localhost:3000/owner/getOwner/`+id,{headers}).pipe(map( data => {
      if(data){
        this.user = data

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

        if(data){
          this.local.set('user',data,1,'w')
          console.log('write ',this.local.get('user'))
          this.isLoggedin = true
        }

        return data
      })
    )
  }
  isLoggedIn(){
    return this.isLoggedin
  }
}
