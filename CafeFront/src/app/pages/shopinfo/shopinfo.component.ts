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
  shopForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imageProfile: new FormControl('https://cdn.onlinewebfonts.com/svg/img_148071.png', [Validators.required]),
    timeO: new FormControl('', [Validators.required]),
    timeC: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    tumbon: new FormControl('', [Validators.required]),
    amphoe: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    post: new FormControl('', [Validators.required]),
    owner: new FormControl('', [Validators.required]),
  });

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
