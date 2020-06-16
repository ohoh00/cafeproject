import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EmployeeService} from '../../service/employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees:any

  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(private em: EmployeeService) { 
    this.onLoading();
    
  }

  ngOnInit(): void {
  }

  
  addEmployee() {
    this.em.addEmployee(this.employeeForm.value).subscribe(
      
      data => {
        console.log(data)
        alert('Employee added successfully');
        this.employeeForm.reset();
      },
      err => {
        console.log(err);
      });
  }
  async onLoading() {
    try {
      await this.em.getEmployee().subscribe(
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

  Update(){
    
  }
  
}
