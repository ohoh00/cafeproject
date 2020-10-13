import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers:any
  shop:any

  constructor(private cs: CustomerService,
    private local : LocalStorageService) {
      try {
        this.cs.getAlluser().subscribe(
          data => {
            this.customers = data;
            console.log(this.customers)
        },
          err => {
            console.log(err)
          });
      } catch (error) {
          console.log(error)
      }
      this.onLoading();
   

  }
  ngOnInit(): void {this.onLoading();
  }

  
  
  onLoading() {
    try {
      this.cs.getAlluser().subscribe(
        data => {
          this.customers = data;
          console.log(this.customers)
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }

}
