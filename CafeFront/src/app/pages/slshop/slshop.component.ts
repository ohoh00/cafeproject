import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../service/shop.service'
import {LocalStorageService} from 'angular-web-storage'

import {OwnerService} from '../../service/owner.service'
@Component({
  selector: 'app-slshop',
  templateUrl: './slshop.component.html',
  styleUrls: ['./slshop.component.scss']
})
export class SlshopComponent implements OnInit {

  shops: any
  id : String
  constructor(private sh: ShopService,
              private local : LocalStorageService,
              private os : OwnerService,) {
                try{
                  this.id = local.get('user').result.id
                }catch(err){
                  console.log(err);
                }
   }

  ngOnInit(): void {
    this.onLoading();
  }

  onLoading() {
    try {
       this.sh.getShopOw(this.id).subscribe(
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
