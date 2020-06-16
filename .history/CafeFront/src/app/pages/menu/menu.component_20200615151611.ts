import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  id : String
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private local : LocalStorageService
    ) {
      this.id = local.get('user').result.id
     }

  ngOnInit(): void {
   
    console.log(this.id)
  }

}
