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
    console.log(data)
    
    this.local.set('shop',data,1,'w')

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
