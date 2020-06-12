import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: any
  URL = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  addMenu(menu){
    return this.http.post<any>(`${this.URL}menu/addMenu`,menu).pipe(
      map(data =>{
        return data
      })
    )
  }

  getAllMenu(){
    return this.http.get<any>(`${this.URL}menu/getMenu`).pipe(
      map(data => {
        if(data){
          this.menu = data
          console.log(this.menu)
        }
        return this.menu
      })
    )
  }
}
