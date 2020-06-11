import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  

}
