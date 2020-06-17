import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-web-storage'
import { MenuService } from '../../service/menu.service'
import { OrderService } from '../../service/order.service'

//getOrder that already paid


import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { fromEventPattern } from 'rxjs';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  dataIn : any[] = []
  menuNumber:any[] = []
  menuList:any[] = []
  typeChart: any;
  dataChart: any;
  optionsChart: any;

  constructor(private os : OrderService,private ms : MenuService,private ls : LocalStorageService) {
    this.ms.getAllMenu().subscribe( data => {
        data.forEach(item => {
          this.menuList.push(item.name)
        });
        console.log('begin',this.menuList)
        this.menuList.forEach(item => {
          this.os.getMenuFromOrders(this.ls.get('shop').id,item).subscribe( data => {
            this.menuNumber.push(data.y)
            console.log('helloss',this.menuNumber)
            this.rederChart(this.menuNumber)
          })
        });
       
    })
    
   
   }

  ngOnInit(): void {
    console.log(this.menuNumber)
   
  }
  rederChart(data){
    console.log(data)
    this.typeChart = 'pie';   
    this.dataChart = {
      labels:this.menuList,
      datasets: [
        {
          label: "สรุปรายจ่าย",
          data: data,
          backgroundColor: [
            '#1abc9c', '#bdc3c7'
          ]
        }
      ],
     
    };
    this.optionsChart = {
      responsive: true,
      
    };
  }
  }

