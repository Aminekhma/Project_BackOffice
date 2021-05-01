import { Injectable } from '@angular/core';
import products from '../assets/data/products.json'
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlApi;

  constructor(public http: HttpClient) {
    this.urlApi = "http://127.0.0.1:8000";  
  }

  getData(){
    return this.http.get(this.urlApi+"/products/");
  }

  getTransactions(){
    return this.http.get(this.urlApi+"/transactions/");
  }

  get(url){
    return this.http.get(url);
  }

  increment(name,qte){
    return this.http.get(this.urlApi+"/incrementStock/" + name +"/" + qte + "/");
  }

  invendu(name,qte){
    return this.http.get(this.urlApi+"/invendu/" + name +"/" + qte + "/");
  }

  decrement(name,qte){
    return this.http.get(this.urlApi+"/decrementStock/" + name +"/" + qte + "/");
  }

  percent(name,p){
    return this.http.get(this.urlApi+"/changePercent/" + name + "/" + p + "/");
  }


}
