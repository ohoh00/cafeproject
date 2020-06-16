import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers:any
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(private cs: CustomerService) { 
    this.onLoading();

  }
  datetoString(date){
    return new Date(date).toLocaleDateString()
  }
  ngOnInit(): void {
    
  }

  
  addCustomer() {
    
    this.cs.addCustomer(this.customerForm.value).subscribe(
      
      data => {
        console.log(data)
        alert('Customer added successfully');
        this.customerForm.reset();
        this.onLoading();
      },
      err => {
        console.log(err);
      });
  }
  onLoading() {
    try {
      this.cs.getAlluser().subscribe(
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

}
