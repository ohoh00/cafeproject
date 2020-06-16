import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../service/shop.service'
import { Router, ActivatedRoute } from '@angular/router';
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
              private os : OwnerService,
              private router : Router) {
                try{
                  this.id = local.get('user').result.id
                  this.onLoading();
                }catch(err){
                  console.log(err);
                }
   }

  ngOnInit(): void {
    this.onLoading();
  }
  logOut(){
    this.local.remove('user')
    this.router.navigate(['/login'])
  }

  clickShop(data){
    var Shop = {name:data}
    this.local.set('shop',Shop,1,'w')
    console.log("Sent Shop Success"+data)
  }

  onLoading() {
    try {
     this.sh.getShopOw(this.id).subscribe( data => {
       this.shops = data
     })
    } catch (error) {
        console.log(error)
    }
  }
}
