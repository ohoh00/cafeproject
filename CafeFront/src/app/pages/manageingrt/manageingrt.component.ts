import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../service/ingredients.service';

@Component({
  selector: 'app-manageingrt',
  templateUrl: './manageingrt.component.html',
  styleUrls: ['./manageingrt.component.scss']
})
export class ManageingrtComponent implements OnInit {

  manageinForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  indata:any
  id:any

  constructor(private is: IngredientsService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  addIngredient(){
    this.is.addIngredient(this.manageinForm.value).subscribe(
      data => {
        console.log(data)
        alert('Ingredient added successfully');
        this.onLoading();
      },
      err =>{
        console.log(err);
      });
  }

  updateIngredient(){
    this.is.updateIngredient(this.manageinForm.value,this.id).subscribe(
      data => {
        console.log(data)
        alert('Ingredient updated successfully');
        this.onLoading();
      },
      err =>{
        console.log(err);
      });
  }

  onLoading() {
    try {
      this.is.getAllIngredients().subscribe(
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

  onChange(id){
    this.id = id;
  }

}
