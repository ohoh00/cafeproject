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
  color:any[] =[]
  typeChart: any;
  dataChart: any;
  optionsChart: any;

  constructor(private os : OrderService,private ms : MenuService,private ls : LocalStorageService) {
    this.ms.getMenuShop(this.ls.get('shop').id).subscribe( data => {
        data.forEach(item => {
          this.menuList.push(item.name)
        });
        console.log('begin',this.menuList)
        this.menuList.forEach(item => {
          this.os.getMenuFromOrders(this.ls.get('shop').id,item).subscribe( data => {
            console.log('hello',data.data)
            this.menuNumber.push(data.data)
            console.log('helloss',this.menuNumber)
            this.color.push(this.getRandomColor())
            this.rederChart(this.menuNumber,this.color)
          })
        });
       
    })
    
   
   }

  ngOnInit(): void {
    console.log(this.menuNumber)
   
  }
  rederChart(data,color){
    console.log(data)
    this.typeChart = 'pie';   
    this.dataChart = {
      labels:this.menuList,
      datasets: [
        {
          label: "สรุปรายจ่าย",
          data: data,
          backgroundColor: color
        }
      ],
     
    };
    this.optionsChart = {
      responsive: true,
      
    };
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#34';
    for (var i = 0; i < 4; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  }

