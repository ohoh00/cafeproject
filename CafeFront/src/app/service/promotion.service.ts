import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {LocalStorageService} from 'angular-web-storage'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotion: any
  URL = 'http://localhost:3000/'
 
  
  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }
  

  addPromotion(promotion){const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}promotions/addPromotion`,promotion,{headers}).pipe(
      map(data =>{
        return data
      })
    )
  }

  getAllpromotion(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}promotions/getPromotion`,{headers}).pipe(
      map(data => {
        if(data){
          this.promotion = data

        }
        return this.promotion
      })
    )
  }

  getPromotionShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<Array<any>>(`http://localhost:3000/promotions/getPromotionShop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.promotion = data
        console.log(data)
      }
      return data
    }))
  }
  deleteitem(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.delete(`${this.URL}promotions/delete/${id}`,{headers});
  }
}
