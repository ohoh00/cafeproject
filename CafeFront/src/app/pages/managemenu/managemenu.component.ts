import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { MenuService } from '../../service/menu.service'
=======
>>>>>>> oh

@Component({
  selector: 'app-managemenu',
  templateUrl: './managemenu.component.html',
  styleUrls: ['./managemenu.component.scss']
})
export class ManagemenuComponent implements OnInit {

  manageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required])
  });

<<<<<<< HEAD
  menu:any

=======
<<<<<<< Updated upstream
  constructor() { }
=======
  menus:any
>>>>>>> oh

  previewLoaded:boolean = false

  constructor(private ms: MenuService) {
    this.onLoading();
   }
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> oh

  ngOnInit(): void {
  }

<<<<<<< HEAD
=======
<<<<<<< Updated upstream
  
=======
>>>>>>> oh
  addMenu(){
    this.ms.addMenu(this.manageForm.value).subscribe(
      data => {
        console.log(data)
        alert('Menu added successfully');
        this.manageForm.reset();
      },
      err =>{
        console.log(err);
      });
  }

<<<<<<< HEAD
  onLoading() {
    try {
      this.ms.getAllMenu().subscribe(
        data => {
          this.menu = data;
          this.manageForm.reset();
      },
        err => {
          console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
  }

=======
>>>>>>> oh
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

<<<<<<< HEAD
  resetForm(){
    this.manageForm.reset();
    this.previewLoaded = false;
  }


  
    
=======
  onLoading() {
    try {
      this.ms.getAllMenu().subscribe(
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
>>>>>>> Stashed changes
>>>>>>> oh

}
