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
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    shop: new FormControl('', [Validators.required])
  });

  constructor(private cs: CustomerService,
    private local : LocalStorageService) {
      try{
        this.customerForm.get("shop").setValue(this.local.get('shop').id)
        
      }catch(err){
        console.log(err);
      }
      this.onLoading();
    console.log('this is construct')

  }
  datetoString(date){
    return new Date(date).toLocaleDateString()
  }
  ngOnInit(): void {
  }

  
  addCustomer() {
    if(!this.customerForm.valid){
      return alert('Customer form is not valid')
    }
    this.customerForm.get("shop").setValue(this.local.get('shop').id)
    this.cs.addCustomer(this.customerForm.value).subscribe(
      
      data => {
        console.log(data)
        alert('Customer added successfully');
        this.onLoading();
        this.customerForm.reset();
      },
      err => {
        console.log(err);
      });
  }
  onLoading() {
    try {
      this.cs.getCustomerShop(this.customerForm.get("shop").value).subscribe(
        data => {
          this.customers = data;
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }
  deleteitem(id){
    this.customerForm.get("shop").setValue(this.local.get('shop').id)
    this.cs.deleteitem(id).subscribe(res => {
      this.onLoading()
    });
  }

  get email(){
    return this.customerForm.get('email');
  }

  get name(){
    return this.customerForm.get('name');
  }

  get phoneNumber(){
    return this.customerForm.get('phoneNumber');
  }

  get birth(){
    return this.customerForm.get('birth');
  }

}
