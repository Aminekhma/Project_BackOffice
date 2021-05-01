import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  urlApi;

  constructor(public http: HttpClient) {
    this.urlApi = "http://127.0.0.1:8000";  
  }

  getData(){
    return this.http.get(this.urlApi+"/transactions/");
  }

  postTransaction(obj){
    return this.http.patch(this.urlApi+"/transactions/",obj);
  }

  public transactionUpdateProduct(id:number,quantity:number,transaction_type:number){
    let json={
      id:id,
      transaction_type:transaction_type,
      quantity: quantity,
      date:""
    }
    const headers = {'content-type':'application/json'}
    return this.http.put(this.urlApi+"/transactions/",json,{'headers':headers})
  }
}
