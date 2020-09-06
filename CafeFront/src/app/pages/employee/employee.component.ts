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
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]{10}')]),
    email: new FormControl('', [Validators.required,Validators.email]),
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
   
  }

  ngOnInit(): void {
    this.onLoading();
  }

  
  addEmployee() {
    if(!this.employeeForm.valid){
      this.resetForm();
      return alert('Employee form is not valid')
    }
    this.employeeForm.get("shop").setValue(this.local.get('shop').id)
    this.em.addEmployee(this.employeeForm.value).subscribe(
      
      data => {
        alert('Employee added successfully');
        this.resetForm();
        this.onLoading();
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
  deleteitem(id){
    this.employeeForm.get("shop").setValue(this.local.get('shop').id)
    this.em.deleteitem(id).subscribe(res => {
      this.onLoading()
    });
  }
  resetForm(){
    this.employeeForm.get('name').setValue('');
    this.employeeForm.get('position').setValue('');
    this.employeeForm.get('phoneNumber').setValue('');
    this.employeeForm.get('email').setValue('');
  }
  get name(){
    return this.employeeForm.get('name');
  }

  get phoneNumber(){
    return this.employeeForm.get('phoneNumber');
  }

  get email(){
    return this.employeeForm.get('email');
  }

  get position(){
    return this.employeeForm.get('position');
  }
  
}
