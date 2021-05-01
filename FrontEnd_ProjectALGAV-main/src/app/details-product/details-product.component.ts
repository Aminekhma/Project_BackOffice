import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { TransactionService } from '../services/transaction.service'

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})

export class DetailsProductComponent implements OnInit {
  products;
  product;;
  listproducts;
  url;

  constructor(public productsService : ProductsService, public transactionService : TransactionService) {
    this.products = [];
  }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res;
        console.log(this.product)
      },
      (err) => {  
        alert('failed loading json data');
      });
  }

  updateList(){
    this.productsService.getData().subscribe(res => {
      this.products=res;},
      (err) => {  
        alert('failed loading json data');
      });
  }
  
  updateProductN(name){
    this.updateList();
    for(let p of this.products){
      if(p.name== name){
        this.product = p;
      }
    }
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
  
  getProductQuantity(name){
    for(let p of this.products){
      if(p.name== name){
        return p.quantity
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



  addTransaction(name,qte,type){
      var idName = this.getProductNameID(name);
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


  incrementQteStock(name,qte){
    var idName = this.getProductNameID(name);
    this.productsService.increment(idName,qte).subscribe(res => {
      console.log(res);
      this.refreshData();

    },
    (err) => {  
      alert('failed loading json data');
    });
    this.addTransaction(name,qte,0);
 }

  decrementQteStock(name,qte){
    if(this.getProductQuantity(name)-qte < 0){
      return alert("Quantité insufisante")
    }
    var idName = this.getProductNameID(name);

    this.productsService.decrement(idName,qte).subscribe(res => {
      console.log(res);
      this.refreshData();

    },
    (err) => {  
      alert('failed loading json data');
    });
    this.addTransaction(name,qte,1);
    
  }

  invendu(name,qte){
    if(this.getProductQuantity(name)-qte < 0){
      return alert("Quantité insufisante")
    }
    var idName = this.getProductNameID(name);

    this.productsService.invendu(idName,qte).subscribe(res => {
      console.log(res);
      this.refreshData();

    },
    (err) => {  
      alert('failed loading json data');
    });
    this.addTransaction(name,qte,2);
    
  }

  changePercent(name,p){
    console.log(typeof parseInt(p));
    if(parseInt(p)<0 || parseInt(p)>100){
      return alert("Valeur de pourcentage incorrect")
    }
    var idName = this.getProductNameID(name);
  
    this.productsService.percent(idName,p).subscribe(res => {
      console.log(res);
      this.refreshData();

    },
    (err) => {
      alert('failed loading json data');
    });

  }


}
