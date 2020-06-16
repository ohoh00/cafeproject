import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LocalStorageService} from 'angular-web-storage'
import {OwnerService} from '../../service/owner.service'

@Component({
  selector: 'app-slshop',
  templateUrl: './slshop.component.html',
  styleUrls: ['./slshop.component.scss']
})
export class SlshopComponent implements OnInit {

  constructor( public router: Router,
    private route: ActivatedRoute,
    private local : LocalStorageService,
    private os : OwnerService,) { }

  ngOnInit(): void {
  }
  logOut(){
    this.local.remove('user')
    this.router.navigate(['/login'])
  }

}
