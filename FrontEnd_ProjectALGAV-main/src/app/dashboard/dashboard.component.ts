import { Component, OnInit } from '@angular/core';
import Chart, { ChartType, ChartOptions } from 'chart.js';
import { ProductsService } from '../services/products.service';
import { TransactionService } from '../services/transaction.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  product;
  products;
  poisson;
  crustacer;
  fruitdemer;

  listDays;
  listMonth;
  listYear;

  data;
  label;

  listTransactions;

  currentYear;
  currentMonth;

  activateForm;

  constructor(public productsService : ProductsService, public transactionService : TransactionService) {
    this.products = [];
    this.poisson = [];
    this.crustacer = [];
    this.fruitdemer = [];
    this.listDays = [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    this.listMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "OCtobre", "Novembre", "Décembre"];
    this.listYear = [2017,2018,2019,2020,2021,2022,2023,2024,2025];
    this.data = [];
    this.label = [];
    this.listTransactions = [];
    this.activateForm = false;
  }

  initialazeTab(){
    for(let p of this.products){
      if(p.category == 0){
        this.poisson.push(p);
      }
      if(p.category == 1){
        this.fruitdemer.push(p);
      }
      if(p.category == 2){
        this.crustacer.push(p);
      }
    }
  }

  ngOnInit(): void {
    this.productsService.getData().subscribe(res => {
      this.products = res;
      this.initialazeTab();
      //console.log(res)
      this.getAllTransaction();

      var myChart = new Chart("myChart", {
        type: 'pie',
        data: {
          labels: ['Poission', 'Fruit de mer', 'Crustacée'],
          datasets: [{
              label: '# of Votes',
              data: [Number(this.poisson.length),Number(this.fruitdemer.length),Number(this.crustacer.length)],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
        },
        options:{
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    display: false
                }
            }]
        }
        }
      });
    },
    
    (err) => {  
      alert('failed loading json data');
      var myChart = new Chart("myChart", {
        type: 'pie',
        data: {
          labels: ['Poission', 'Fruit de mer', 'Crustacée'],
          datasets: [{
              label: '# of Votes',
              data: [Number(this.poisson.length),Number(this.fruitdemer.length),Number(this.crustacer.length)],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
        },
        options:{
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        }
      });
    });

    var myBarChart = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels:[],
        datasets:[{
          data: [],
        }]
      },
      options : {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    }
  });
  }

  getAllTransaction(){
    this.transactionService.getData().subscribe(res=>{
      this.listTransactions = res;
      console.log(this.listTransactions)
    },(err)=>{
      alert(err);
    })
  }

  setYear(year){
    //console.log(event)
    this.currentYear = year;
    //console.log(this.currentYear);
    console.log(this.currentYear)
    console.log("_____________________")
    this.refreshDataList("year");
    //this.setGraphe(this.listMonth);
    this.setGraphe(this.listMonth);
    this.activateForm = true;
  }

  setMonth(month){
    this.currentMonth = month;
    this.refreshDataList("month");
    this.setGraphe(this.listDays);
  }

  convertDate(d){
    var date = new Date(d);
    return {"year":date.getFullYear(),"month":date.getMonth(), "days":date.getDate(),"hours":date.getHours(),"minutes":date.getMinutes()}
  }

  refreshDataList(type){
    this.data = [];
    if(type == "year"){
      this.data = [];
      this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(var i = 0; i < this.listTransactions.length; i++) {
        var obj = this.listTransactions[i];
  
        if(obj.transaction_type == 1){
          
            var currentdate = this.convertDate(obj.date);
            if(type == "year" && currentdate.year == this.currentYear){
              console.log(currentdate.month)
    
              this.data[currentdate.month] = this.data[currentdate.month] + obj.price;
            }
        }
      }
    }
    else{
      if(type == "month"){
        this.data = [];
        this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(var i = 0; i < this.listTransactions.length; i++) {
          var obj = this.listTransactions[i];
    
          if(obj.transaction_type == 1){
            
              var currentdate = this.convertDate(obj.date);
              console.log("current year : " + this.currentYear);
              console.log("currentdate year : " + currentdate.year);
              console.log("curent month : " + this.listMonth.indexOf(this.currentMonth));
              console.log("currentdate month : " + currentdate.month);
              if(this.currentYear != undefined && currentdate.year == this.currentYear && this.listMonth.indexOf(this.currentMonth) == currentdate.month){
                console.log("currentdate days : " + currentdate.days)
                console.log(this.data[currentdate.days])
                console.log("_______________________________________________")
                this.data[currentdate.days] = this.data[currentdate.days] + obj.price;
              }
          }
        }
      }
    }
    console.log(this.data);
  }

  setGraphe(liste){
    var myBarChart = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels:liste,
        datasets:[{
          label: 'transactions',
          data: this.data,
          backgroundColor:'red'
        }]
      },
      options : {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    }
  });
}  
}
