import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {OwnerService} from '../../service/owner.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: string;
  password: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private os : OwnerService
  ) { }

  ngOnInit(): void {
    
  }

  
  clickLogin(){
    const owner = {email:this.id,password:this.password}
    console.log(owner)
    this.os.login(owner).subscribe(
      data => {
        if(data.status){
          this.router.navigateByUrl('/slshop');
        }
        else{
          alert('Username or Password is incorrect if')
        }
      },
      err => {
        alert('Username or Password is incorrect')
      }
    )
  }

}
