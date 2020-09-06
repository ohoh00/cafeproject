import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LocalStorageService} from 'angular-web-storage'

import {OwnerService} from '../../service/owner.service'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  id : String
  shop: String
  owner: any
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private local : LocalStorageService,
    private os : OwnerService,
    ) 
    {
        try{
          this.id = local.get('user').result.id
          this.shop = local.get('shop').name
          this.getOwner()
        }catch(err){
          console.log(err);
        }
     }
  ngOnInit(): void {
    this.getOwner()
  }
  getOwner(){
    this.os.getOwner(this.id).subscribe(data => {
      this.owner = {name:data.name,email:data.email,img:data.imageProfile}

    })
  }
  getName(){
    return this.owner.name
  }
  getEmail(){
    return this.owner.email
  }
  getImg(){
    return this.owner.img
  }
  logOut(){
    this.local.remove('user')
    this.local.remove('shop')
    this.router.navigate(['/login'])
  }
}
