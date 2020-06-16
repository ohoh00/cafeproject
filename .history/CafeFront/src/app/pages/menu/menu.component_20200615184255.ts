import { Component, OnInit } from '@angular/core';
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
  customer: any
  isLogin : boolean = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private local : LocalStorageService,
    private os : OwnerService
    ) {
      this.id = local.get('user').result.id
      this.isLogin = this.router.url === '/login'
     }

  ngOnInit(): void {
    console.log(this.id)
    this.os.getOwner(this.id).subscribe(data => {
      this.customer = {name:data.name,email:data.email}
      console.log('name',this.customer.name)
      console.log('this is data',data)
    })
  }
  logOut(){
    this.local.remove('user')
    this.router.navigate(['/login'])
  }


}
