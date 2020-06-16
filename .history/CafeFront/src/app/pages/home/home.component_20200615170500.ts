import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../../service/owner.service'
import {LocalStorageService} from 'angular-web-storage'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name:String
  constructor(private os:OwnerService,private local : LocalStorageService) { }

  ngOnInit(): void {
    this.os.getOwner(this.local.get('user').result._id).subscribe(data => {
      this.name = data.name.toUpperCase()
      console.log('this is name',this.name)
    })
  }

}
