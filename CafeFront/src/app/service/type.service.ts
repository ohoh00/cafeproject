import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  type: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 

  }

  getType(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}type/getType`,{headers}).pipe(
      map(data => {
        if(data){
          this.type = data
    
        }
        return this.type
      })
    )
  }

}
