import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {LocalStorageService} from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  ingredient: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient,private ls : LocalStorageService) { 
    
  }


  addIngredient(ingredient){const headers = {'authorization': this.ls.get('user').token}
    return this.http.post<any>(`${this.URL}ingredients/addIngredient`,ingredient,{headers}).pipe(
      map(data =>{
        return data
      })
    )
  }

  updateingredients(ingredients){
    const headers = {'authorization': this.ls.get('user').token}
     return this.http.put<any>(`${this.URL}ingredients/updateingredients`,ingredients,{headers}).pipe(
       map(data =>{
         return data
       })
     )
   }

  getAllIngredients(){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`${this.URL}ingredients/getIngredients`,{headers}).pipe(
      map(data => {
        if(data){
          this.ingredient = data
          console.log(data)
        }
        return this.ingredient
      })
    )
  }

  deleteitem(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.delete(`${this.URL}ingredients/delete/${id}`,{headers});
  }

  getIngredientShop(id){const headers = {'authorization': this.ls.get('user').token}
    return this.http.get<any>(`http://localhost:3000/ingredients/getIngredientShop/${id}`,{headers}).pipe(map( data => {
      if(data){
        this.ingredient = data
        console.log(data)
      }
      return this.ingredient
    }))
  }
  
}
