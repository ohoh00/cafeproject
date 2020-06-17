import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ShopService } from '../../service/shop.service'
import {LocalStorageService} from 'angular-web-storage'
import { Router } from '@angular/router';

@Component({
  selector: 'app-regshop',
  templateUrl: './regshop.component.html',
  styleUrls: ['./regshop.component.scss']
})
export class RegshopComponent implements OnInit {
  id: String
  Open: String
  Close: String
  shopForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imageProfile: new FormControl('https://cdn.onlinewebfonts.com/svg/img_148071.png', [Validators.required]),
    timeO: new FormControl('', [Validators.required]),
    timeC: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required,Validators.pattern('\d{10}')]),
    address: new FormControl('', [Validators.required]),
    tumbon: new FormControl('', [Validators.required]),
    amphoe: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
<<<<<<< HEAD
    post: new FormControl('', [Validators.required,Validators.maxLength(5),Validators.minLength(5)]),
    owner: new FormControl('', [Validators.required]),
=======
    post: new FormControl('', [Validators.required,Validators.pattern('\d{5}')]),
    owner: new FormControl('',),
>>>>>>> 806b2070ab3f3434379f38f8660da1c2ccb3d977
  });

  shops:any

  constructor(private sh: ShopService,
    private local : LocalStorageService, private router : Router) {
      try{
                  this.shopForm.get("owner").setValue(local.get('user').result.id)
                  
                }catch(err){
                  console.log(err);
                }
    this.onLoading();
   }

  ngOnInit(): void {
  }

  addShop(){
    if(this.shopForm.valid){
      this.getFormValidationErrors()
      return alert('Shop form is invalid')
    }
    console.log(this.shopForm.get("timeO").value)
    this.sh.addShop(this.shopForm.value).subscribe(
      data => {
        console.log(data)
        alert('Shop added successfully');
        this.router.navigate(['/slshop'])
        this.onLoading();
        this.resetForm();
      },
      err =>{
        console.log(err);
      });
  }

  onChangeImg(e:any){
    if(e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!file.type.match(pattern)){
        alert('invalid format');
        this.shopForm.reset();
      }else{
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.shopForm.patchValue({
            imageProfile: reader.result
          });
        };
      }
    }
  }

  onLoading() {
    try {
      this.sh.getAllShops().subscribe(
        data => {
          this.shops = data;       
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }

  resetForm(){
    this.shopForm.reset();
  }
  getFormValidationErrors() {
    Object.keys(this.shopForm.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.shopForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

  get name(){
    return this.shopForm.get('name');
  }

  get phoneNumber(){
    return this.shopForm.get('phoneNumber');
  }

  get description(){
    return this.shopForm.get('description');
  }

  get timeO(){
    return this.shopForm.get('timeO');
  }

  get timeC(){
    return this.shopForm.get('timeC');
  }

  get address(){
    return this.shopForm.get('address');
  }

  get tumbon(){
    return this.shopForm.get('tumbon');
  }

  get amphoe(){
    return this.shopForm.get('amphoe');
  }

  get province(){
    return this.shopForm.get('province');
  }

  get post(){
    return this.shopForm.get('post');
  }


}
