import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EmployeeService} from '../../service/employee.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees:any
  shop: String
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    shop: new FormControl('', [Validators.required])
  });

  constructor(private em: EmployeeService,
    private local : LocalStorageService) { 
      try{
        this.employeeForm.get("shop").setValue(this.local.get('shop').id)
        
      }catch(err){
        console.log(err);
      }
      this.onLoading();
    console.log('this is construct')
  }

  ngOnInit(): void {
    this.onLoading();
  }

  
  addEmployee() {
    this.employeeForm.get("shop").setValue(this.local.get('shop').id)
    this.em.addEmployee(this.employeeForm.value).subscribe(
      
      data => {
        console.log(data)
        alert('Employee added successfully');
        this.onLoading();
        this.employeeForm.reset();
      },
      err => {
        console.log(err);
      });
  }
  onLoading() {
    try {
       this.em.getEmployeeShop(this.employeeForm.get("shop").value).subscribe(
        data => {
          this.employees = data;
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }
  
}
