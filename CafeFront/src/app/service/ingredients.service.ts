import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  ingredient: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  addIngredient(ingredient){
    return this.http.post<any>(`${this.URL}ingredients/addIngredient`,ingredient).pipe(
      map(data =>{
        return data
      })
    )
  }

  updateIngredient(ingredient,id){
    console.log(ingredient);
    return this.http.put<any>(`${this.URL}ingredients/update/${id}`,ingredient).pipe(
      map(data =>{
        return data
      })
    )
  }

  getAllIngredients(){
    return this.http.get<any>(`${this.URL}ingredients/getIngredients`).pipe(
      map(data => {
        if(data){
          this.ingredient = data
          console.log(data)
        }
        return this.ingredient
      })
    )
  }

  deleteitem(id){
    return this.http.delete(`${this.URL}ingredients/delete/${id}`);
  }

  getIngredientShop(id){
    return this.http.get<any>(`http://localhost:3000/ingredients/getIngredientShop/${id}`).pipe(map( data => {
      if(data){
        this.ingredient = data
        console.log(data)
      }
      return this.ingredient
    }))
  }
  
}
