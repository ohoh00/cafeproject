import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  ingredient: any
  URL = 'http://localhost:3000'

  constructor(private http : HttpClient) { }

  addIngredient(ingredient){
    return this.http.post<any>(`${this.URL}ingredients/addIngredient`,ingredient).pipe(
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
}
