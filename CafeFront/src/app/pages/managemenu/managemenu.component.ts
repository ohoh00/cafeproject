import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../service/menu.service'
import { VariationService } from '../../service/variation.service'
import { TypeService } from '../../service/type.service'
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
    variation: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required,Validators.min(1)]),
    img: new FormControl('', [Validators.required]),
    shop: new FormControl('', [Validators.required])
  });
  variationList: any
  typeList: any
  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
  });

  menus:any
  previewLoaded:boolean = false

  

  constructor(private ms: MenuService,private local : LocalStorageService,private vr: VariationService,private ty: TypeService) {
    try{
      this.manageForm.get("shop").setValue(this.local.get('shop').id)
      
    }catch(err){
      console.log(err);
    }
    this.onLoading();
    this.vr.getVariation().subscribe( data => {
      this.variationList = data
      console.log(this.variationList)
    })
    this.ty.getType().subscribe( data => {
      this.typeList = data
      console.log(this.typeList)
    })
   }

  ngOnInit(): void {
  }
  getVariation(){
    this.vr.getVariation().subscribe( data => {
      this.variationList = data
    
    })
    console.log(this.variationList)
  }
  getType(){
    this.ty.getType().subscribe( data => {
      this.typeList = data
    
    })
    console.log(this.typeList)
  }
  addMenu(){
    if(!this.manageForm.valid){
      this.resetForm();
      return alert('Menu form is not valid')
    }
    this.manageForm.get("shop").setValue(this.local.get('shop').id)
    this.ms.addMenu(this.manageForm.value).subscribe(
      data => {
        alert('Menu added successfully');
        this.resetForm();
        this.onLoading();
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

  updateMenu(){
    if(!this.updateForm.valid){
      return alert('Menu form is not valid')
    }
    this.ms.updateMenu(this.updateForm.value).subscribe(
      data => {
   
        alert('Menu updated successfully');
        this.onLoading();
      },
      err =>{
        console.log(err);
      });
  }

  onChange(id){
    this.updateForm.get('id').setValue(id);
    console.log(id)
  }

  deleteitem(id){
    this.ms.deleteitem(id).subscribe(res => {
      this.onLoading()
    });
  }

  resetForm(){
    this.manageForm.get('name').setValue('');
    this.manageForm.get('type').setValue('');
    this.manageForm.get('variation').setValue('');
    this.manageForm.get('price').setValue('');
    this.manageForm.get('img').setValue('');
    this.previewLoaded = false;
  }

  get name(){
    return this.manageForm.get('name');
  }

  get type(){
    return this.manageForm.get('type');
  }

  get price(){
    return this.manageForm.get('price');
  }

  selectVariation(x){
    this.manageForm.get('variation').setValue(this.variationList[x].variation)
    console.log(this.updateForm.get('variation').value)
    console.log(x)
  }
  selectType(x){
    this.manageForm.get('type').setValue(this.typeList[x].type)
    console.log(this.updateForm.get('type').value)
    console.log(x)
  }



}
