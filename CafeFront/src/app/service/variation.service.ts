import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class VariationService {

  variation: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 

  }

  getVariation(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}variation/getVariation`,{headers}).pipe(
      map(data => {
        if(data){
          this.variation = data
    
        }
        return this.variation
      })
    )
  }

}
