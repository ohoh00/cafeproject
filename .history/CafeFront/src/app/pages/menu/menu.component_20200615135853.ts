import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  id : String
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']

    });
    console.log(this.id)
  }

}
