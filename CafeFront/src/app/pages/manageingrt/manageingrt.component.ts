import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../service/ingredients.service';
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-manageingrt',
  templateUrl: './manageingrt.component.html',
  styleUrls: ['./manageingrt.component.scss']
})
export class ManageingrtComponent implements OnInit {

  shop: String
  manageinForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    shop: new FormControl('', [Validators.required])
  });

  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  indata:any

 

  constructor(private is: IngredientsService,private local : LocalStorageService) { 
    try{
      this.shop = this.local.get('shop').id
      this.manageinForm.get("shop").setValue(this.local.get('shop').id)
      
    }catch(err){
      console.log(err);
    }
    this.onLoading();
  }

  ngOnInit(): void {
    this.onLoading()
  }

  addIngredient(){
    if(!this.manageinForm.valid){
      return alert('Manage ingredeints form is not valid')
    }
    this.manageinForm.get("shop").setValue(this.shop)
    this.is.addIngredient(this.manageinForm.value).subscribe(
      data => {
  
        alert('Ingredient added successfully');
        this.resetForm();
        this.onLoading();
        
      },
      err =>{
        console.log(err);
      });
  }

  updateIngredients(){
    if(!this.updateForm.valid){
      return alert('ingredient form is not valid')
    }
    this.is.updateingredients(this.updateForm.value).subscribe(
      data => {
        alert('ingredient updated successfully');
        this.updateForm.reset();
        this.onLoading();
       
        
      },
      err =>{
        console.log(err);
      });
  }

  onLoading() {
    try {
      this.is.getIngredientShop(this.shop).subscribe(
        data => {
          this.indata = data; 
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }

  resetForm(){
    this.manageinForm.get('status').setValue('');
    this.manageinForm.get('name').setValue('');
  }


  onChange(id){
    this.updateForm.get('id').setValue(id);
  }

  deleteitem(id){
    this.is.deleteitem(id).subscribe(res => {
      this.onLoading()
    });
  }

  get name(){
    return this.manageinForm.get('name');
  }

  get status(){
    return this.manageinForm.get('status');
  }

  

  

}
