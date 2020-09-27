import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  status: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 

  }

  getStatus(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}ingrestatus/getStatus`,{headers}).pipe(
      map(data => {
        if(data){
          this.status = data
    
        }
        return this.status
      })
    )
  }

}
