import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {OwnerService} from '../../service/owner.service'
@Component({
  selector: 'app-regmem',
  templateUrl: './regmem.component.html',
  styleUrls: ['./regmem.component.scss']
})
export class RegmemComponent implements OnInit {

  registerForm  = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required]),
    imageProfile: new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.minLength(10),Validators.maxLength(10),Validators.required]),
    birth: new FormControl('',[Validators.required]),//"2014-03-12T13:37:27.000Z"
    address: new FormControl('',[Validators.required]),//"123"
    tumbon: new FormControl('',[Validators.required]),
    amphoe: new FormControl('',[Validators.required]),
    province: new FormControl('',[Validators.required]),
    post: new FormControl(0,[Validators.maxLength(5),Validators.minLength(5)]),
    personalId:new FormControl('',[Validators.maxLength(13),Validators.minLength(13)])
  })
  previewLoaded:boolean = false
  constructor(private os : OwnerService) {

   }

  ngOnInit(): void {
  }
  onChangeImg(e:any){
    if(e.target.files.length > 0){
      const file = e.target.files[0]
      var pattern = /image-*/
      const reader = new FileReader()
      if(!file.type.match(pattern)){
        alert('invalid format')
        this.registerForm.reset()
      }
      else{
        reader.readAsDataURL(file)
        reader.onload = () =>{
          this.previewLoaded = true
          this.registerForm.patchValue({
            imageProfile: reader.result
          })
        }
      }
    }
  }
  register(){
    if(!this.registerForm.valid){
      return alert("Register form is invalid.")
    }
    this.os.addOwner(this.registerForm.value).subscribe(
      data =>{
        alert('Owner added successfully')
        this.registerForm.reset()
      }

      ,err => {
        console.log(err)
      }
    )
  }
}
