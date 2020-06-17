import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../service/shop.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-shopinfo',
  templateUrl: './shopinfo.component.html',
  styleUrls: ['./shopinfo.component.scss']
})
export class ShopinfoComponent implements OnInit {
  
  id: String
  shops:any
  
  constructor(private local : LocalStorageService,private sh: ShopService) {
    this.id = local.get('shop').id
    this.onLoading();
   }

  ngOnInit(): void {
    this.onLoading();
  }
  onLoading() {
    try {
      this.sh.getShop(this.id).subscribe(
        data => {
          this.shops = data;       
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }
  

}
