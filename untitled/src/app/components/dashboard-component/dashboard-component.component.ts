import {Component, OnInit} from '@angular/core';
import {BarChartModule, LineChartModule, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {NgForOf} from '@angular/common';
import {DashboardService} from '../../service/dashboard.service';
import {DashBoardRevenueDTO} from '../../classes/dash-board-revenue-dto';
import {CustomerDTO} from '../../classes/customer-dto';
import {ProductDTO} from '../../classes/product-dto';
import {MonthlyIncomeDTO} from '../../classes/monthly-income-dto';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    PieChartModule,
    BarChartModule,
    LineChartModule,
    NgForOf
  ],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css',
  standalone:true
})
export class DashboardComponentComponent implements  OnInit{

  dashboardDto!:DashBoardRevenueDTO;
  topCustomer!:Array<CustomerDTO>;
  productListDTO!:Array<ProductDTO>;
  clothingListDTO!:Array<ProductDTO>;
  monthlyIncomeListDTO!:Array<MonthlyIncomeDTO>;

  // pieData = [
  //   { name: 'Electronics', value: 35000 },
  //   { name: 'Clothing', value: 20000 },
  //   { name: 'Home Appliances', value: 15000 },
  //   { name: 'Books', value: 10000 },
  // ];

  secondPieData:any[] = [];

  pieData: any[] = []; // Declare only, don't assign yet


  // barData:any = [
  //   { name: 'January', value: 5000 },
  //   { name: 'February', value: 8000 },
  //   { name: 'March', value: 12000 },
  //   { name: 'April', value: 10000 },
  //   { name: 'May', value: 15000 },
  // ];
  barData:any = []

  multiSeriesData = [
    {
      "name": "Sales",
      "series": [
        { "name": "January", "value": 5000 },
        { "name": "February", "value": 8000 },
        { "name": "March", "value": 12000 },
        { "name": "April", "value": 10000 },
        { "name": "May", "value": 15000 }
      ]
    },
    {
      "name": "Orders",
      "series": [
        { "name": "January", "value": 120 },
        { "name": "February", "value": 150 },
        { "name": "March", "value": 200 },
        { "name": "April", "value": 180 },
        { "name": "May", "value": 240 }
      ]
    }
  ];


  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#7E57C2']
  };

  constructor(public dashBoardService:DashboardService) {
  }
  ngOnInit(): void {
    this.fetchData()
    this.getTopCustomer()
    this.getSoldProducts()
    this.getSoldClothing()
    this.getMonthLyIncome()
  }
  fetchData(){
    this.dashBoardService.getDashBoardDTO().subscribe({
        next:(data)=>{
          this.dashboardDto = data;
        },
       error:(err)=>{
          console.log(err)
       },
      complete:()=>{
          console.log("Process completed")
      }

      })
  }

  getTopCustomer(){
    this.dashBoardService.getTopCustomersDTO().subscribe({
      next:(data)=>{
        this.topCustomer = data;
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Process com")
      }
    })
  }

  getSoldProducts(){
   this.dashBoardService.getTopProductList().subscribe({
     next:(data)=>{
        this.productListDTO = data
       this.pieData = this.productListDTO.map(item => ({
         name: item.productName,
         value: item.numberOfProducts
       }))
       console.log(this.pieData)
     },
     error:(err)=>{
       console.log(err)
     },
     complete:()=>{
       console.log("Process completed !")
     }
   })
  }

  getSoldClothing(){
    this.dashBoardService.getTopClothingsList().subscribe(
      {
        next:(data)=>{
          this.clothingListDTO = data;
          this.secondPieData = this.clothingListDTO.map(item =>({
            name: item.productName,
            value:item.numberOfProducts
          }))
        }
      }

    )
  }

   getMonthLyIncome(){
    this.dashBoardService.getMonthLyIncome().subscribe({
      next:(data)=>{
        this.monthlyIncomeListDTO = data;
        this.barData = this.monthlyIncomeListDTO.map(item=>({
          name: this.getMonthName(item.month), // Convert month number to name
          value: item.income
        }))
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Process completed ! ")
      }
    })
   }

  getMonthName(monthNumber: number): string {
    switch (monthNumber) {
      case 1: return 'January';
      case 2: return 'February';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September';
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
      default: return 'Unknown';
    }
  }

}
