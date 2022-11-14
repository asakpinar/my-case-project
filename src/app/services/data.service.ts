import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../Module/Products';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<Products[]>("https://dummyjson.com/products")
  }
}
