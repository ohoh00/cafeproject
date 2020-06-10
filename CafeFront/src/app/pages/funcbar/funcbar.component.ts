import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcbar',
  templateUrl: './funcbar.component.html',
  styleUrls: ['./funcbar.component.scss']
})
export class FuncbarComponent implements OnInit {

  constructor(
      private router: Router,
      private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
  }

  clickpass(){
    this.router.navigateByUrl('/managmenu');
  }


}
