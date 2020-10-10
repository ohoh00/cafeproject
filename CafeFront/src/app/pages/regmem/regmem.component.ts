import { Component, OnInit ,OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms'
import {OwnerService} from '../../service/owner.service'
import { variable } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regmem',
  templateUrl: './regmem.component.html',
  styleUrls: ['./regmem.component.scss']
})
export class RegmemComponent implements OnInit , OnChanges {
  used : any
  registerForm  = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required]),
    imageProfile: new FormControl('../../../assets/regmem.png',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.minLength(10),Validators.maxLength(10),Validators.required,Validators.pattern('[0-9]{10}')]),
    address: new FormControl('',[Validators.required]),//"123"
    tumbon: new FormControl('',[Validators.required]),
    amphoe: new FormControl('',[Validators.required]),
    province: new FormControl('',[Validators.required]),
    post: new FormControl('',[Validators.required,Validators.maxLength(5),Validators.minLength(5),Validators.pattern('[0-9]{5}')]),
    personalId:new FormControl('',[Validators.required,Validators.maxLength(13),Validators.minLength(13),Validators.pattern('[0-9]{13}')])
  })

  chpass = new FormControl('',[Validators.required])


  previewLoaded:boolean = false
  constructor(private os : OwnerService,private router : Router) {

   }


  ngOnInit(): void {
  }
  ngOnChanges(){
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
        this.router.navigate(['/login'])
        this.registerForm.reset()
      }

      ,err => {
        console.log(err)
      }
    )
  }
  reallogin(emails){
    var status = ""
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2YzNTU3MDE0ZWM4NGVmY2M4NzhkNyIsInVzZXJuYW1lIjoiYjYwMTA3OTkiLCJwYXNzd29yZCI6IiQyYSQxMCQya0hSUmpmOU5Eby45Zm01QnA0VmIuSHJUd2FRczBNYnh3U2RpZjVaZmRXL1pHdy5YYmM4ZSIsImlhdCI6MTU5MDY0MDUxNywiZXhwIjoxNTkwNjQwNzY3fQ.PzOfHwCMNXmKjs4gfN1x_rlfCPEkUe4vW2YEdc6ufjA");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({email:emails});

    let requestOptions: RequestInit  = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/owner/email", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        var res = result.toString()
        console.log(res) 
        if(res.indexOf('0') > -1){
          console.log("Found")
          this.used = '0'
        }
        else{
          console.log("not found")
          this.used = '1'
        }
      
      })
      .catch(error => console.log('error', error));

      return status
  }
  emaildetect(email){
    this.reallogin(email)
    console.log(this.used)
    
  }

    get email(){
      return this.registerForm.get('email');
    }

    get password(){
      return this.registerForm.get('password');
    }

    get name(){
      return this.registerForm.get('name');
    }

    get phoneNumber(){
      return this.registerForm.get('phoneNumber');
    }

    get personalId(){
      return this.registerForm.get('personalId');
    }

    get address(){
      return this.registerForm.get('address');
    }

    get tumbon(){
      return this.registerForm.get('tumbon');
    }

    get amphoe(){
      return this.registerForm.get('amphoe');
    }

    get province(){
      return this.registerForm.get('province');
    }

    get post(){
      return this.registerForm.get('post');
    }



}
