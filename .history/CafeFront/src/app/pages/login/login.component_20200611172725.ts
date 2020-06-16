import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
  }

  
  clickLogin(){
    console.log("Login work!");
      if(this.id=="admin"){
        if(this.password=="1703"){
          alert("Login Success");
        this.router.navigateByUrl('/slshop');
        }
        else{
          alert("Wrog password");
        }
      }
      else{
        alert("Wrog id");
      }
  }

}
