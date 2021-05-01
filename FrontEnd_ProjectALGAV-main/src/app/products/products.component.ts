import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { TransactionService } from '../services/transaction.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product;
  products;
  poisson;
  crustacer;
  fruitdemer;
  isClicked;
  listStock;
  listPercent;

  constructor(public productsService : ProductsService, public transactionService : TransactionService) {
    this.products = [];

    this.isClicked = false;
    
  }
  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res;
        //this.getProductId(1);
   
      },
      (err) => {  
        alert('failed loading json data');
      });
  }

  getProductId(id){
    for(let p of this.products){
      if(p.tigID == 1){
        this.product = p;
      }
    }
  }

  getProductName(name){
    for(let p of this.products){
      if(p.name== name){
        this.product = p;
        this.isClicked = true;
      }
    }
  }

  getProductNameID(name){
    for(let p of this.products){
      if(p.name== name){
        return p.tigID
      }
    }
  }
  
  refreshData(){
    this.productsService.getData().subscribe(res => {
      this.products = res;

    },(err)=>{
      alert('failerd loading json data');
      console.log(err);
    });
  }


  addTransaction(idName,qte,type){
      this.transactionService.transactionUpdateProduct(idName,qte,type).subscribe(res => {
        console.log(res);
        this.refreshData();

      },
      (err) => {  
        alert('failed loading json data');
      });
  }
    
/*    date (ajoutée automatiquement lors de l’enregistrement de la transaction)
● prix
● quantité
● tigID (ID d’origine dans l’API de Bateau Thibault)
● type (une transaction peut être  0 un achat, 1 une vente, ou 2 des invendus)*/
  getcurtacer(){
    return this.crustacer;
    
  }

  getPoisson(){
    return this.poisson;
    
  }

  getFruit(){
    return this.fruitdemer;
    
  }

  incrementQteStock(idName,qte){
    console.log("id : "+idName)
    this.productsService.increment(idName,qte).subscribe(res => {
      console.log(res);
      this.refreshData();

    },
    (err) => {  
      alert('failed loading json data');
    });
    this.addTransaction(idName,qte,0);
    this.refreshData();
 }

  decrementQteStock(idName,qte){

    this.productsService.decrement(idName,qte).subscribe(res => {
      console.log(res);
      this.refreshData();


    },
    (err) => {  
      alert('failed loading json data');
    });
    this.addTransaction(idName,qte,1);
    this.refreshData();
  }

  changePercent(idName,p){
  
    this.productsService.percent(idName,p).subscribe(res => {
      console.log(res);
      this.refreshData();
    },
    (err) => {
      alert('failed loading json data');
    });
    this.refreshData();
  }

  refreshListStock(id,value,name){
    this.listStock[id] = {value,id};
    console.log(this.listStock);
  }

  postListStock(){
    //console.log(this.listStock);
    for(const property in this.listStock){
      this.incrementQteStock(this.listStock[property].id,this.listStock[property].value);
    }
    this.listStock={};

    this.refreshData();
  }
  
  deleteListStock(){
    //console.log(this.listStock);
    for(const property in this.listStock){
      this.decrementQteStock(this.listStock[property].id,this.listStock[property].value);
    }
    this.listStock={}
    this.refreshData();
  }

  refreshListPercent(id,percent,name){
    this.listPercent[id] = {id,name};
  }

  postListPercent(){
    //console.log(this.listStock);
    for(const property in this.listPercent){
      this.changePercent(this.listPercent[property].id,this.listPercent[property].percent);
    }
    this.listPercent={};
    this.refreshData();
  }


}
