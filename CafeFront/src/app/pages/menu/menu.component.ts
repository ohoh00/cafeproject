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
  customer: any
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
    console.log(this.id)
    this.os.getOwner(this.id).subscribe(data => {
      this.customer = {name:data.name,email:data.email,img:data.imageProfile}
      console.log('name',this.customer.name)
      console.log('this is data',data)
    })
  }
  logOut(){
    this.local.remove('user')
    this.router.navigate(['/login'])
  }

  ngOnDestroy(){
    console.log('this is destroy');
    
  }


}
