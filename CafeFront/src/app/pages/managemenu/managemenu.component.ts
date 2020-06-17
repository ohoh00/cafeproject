import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../service/menu.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-managemenu',
  templateUrl: './managemenu.component.html',
  styleUrls: ['./managemenu.component.scss']
})
export class ManagemenuComponent implements OnInit {

  shop: String
  manageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    shop: new FormControl('', [Validators.required])
  });

  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  menus:any
  previewLoaded:boolean = false

  constructor(private ms: MenuService,private local : LocalStorageService) {
    try{
      this.manageForm.get("shop").setValue(this.local.get('shop').id)
      
    }catch(err){
      console.log(err);
    }
    this.onLoading();
   }

  ngOnInit(): void {
  }

  addMenu(){
    this.manageForm.get("shop").setValue(this.local.get('shop').id)
    this.ms.addMenu(this.manageForm.value).subscribe(
      data => {
        console.log(data)
        alert('Menu added successfully');
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
        this.manageForm.reset();
      }else{
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.manageForm.patchValue({
            img: reader.result
          });
        };
      }
    }
  }

  onLoading() {
    try {
      this.ms.getMenuShop(this.manageForm.get("shop").value).subscribe(
        data => {
          this.menus = data;       
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }

  resetForm(){
    this.manageForm.reset();
    this.previewLoaded = false;
  }

  updateMenu(){
    this.ms.updateMenu(this.updateForm.value).subscribe(
      data => {
        console.log(data)
        alert('Menu updated successfully');
        this.onLoading();
      },
      err =>{
        console.log(err);
      });
  }

  onChange(id){
    this.manageForm.get('id').setValue(id);
  }

  deleteitem(id){
    this.ms.deleteitem(id).subscribe(res => {
      this.onLoading()
    });
  }




}
