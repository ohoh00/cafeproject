import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromotionService } from '../../service/promotion.service'
import {LocalStorageService} from 'angular-web-storage'

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  promotions:any
  shop:any
  promotionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
    point: new FormControl('', [Validators.required]),
    shop: new FormControl('', [Validators.required])
  });

  constructor(private pm: PromotionService,
    private local : LocalStorageService) {
      try{
        this.promotionForm.get("shop").setValue(this.local.get('shop').id)
        
      }catch(err){
        console.log(err);
      }
      this.onLoading();
   

  }
  ngOnInit(): void {this.onLoading();
  }

  
  addPromotion() {
    if(!this.promotionForm.valid){
      this.resetForm();
      return alert('Promotion form is not valid')
    }
    this.promotionForm.get("shop").setValue(this.local.get('shop').id)
    this.pm.addPromotion(this.promotionForm.value).subscribe(
      
      data => {
     
        alert('Promotion added successfully');
        this.resetForm();
        this.onLoading();
      },
      err => {
        console.log(err);
      });
  }
  onLoading() {
    try {
      this.pm.getPromotionShop(this.promotionForm.get("shop").value).subscribe(
        data => {
          this.promotions = data;
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }
  deleteitem(id){
    this.promotionForm.get("shop").setValue(this.local.get('shop').id)
    this.pm.deleteitem(id).subscribe(res => {
      this.onLoading()
    });
  }

  resetForm(){
    this.promotionForm.get('name').setValue('');
    this.promotionForm.get('type').setValue('');
    this.promotionForm.get('discount').setValue('');
    this.promotionForm.get('point').setValue('');
  }
  get name(){
    return this.promotionForm.get('name');
  }

  get type(){
    return this.promotionForm.get('type');
  }

  get discount(){
    return this.promotionForm.get('discount');
  }

  get point(){
    return this.promotionForm.get('point');
  }

}
