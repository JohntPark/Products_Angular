import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('https://localhost:44365/api/product')
  }
  getProductById(product){
    console.log("HITTING")
    console.log(product)
    return this.http.get(`https://localhost:44365/api/product/${product.id}`);
  }
  postProduct(product) {
    return this.http.post('https://localhost:44365/api/product', product).subscribe(x => console.log(x));
  }
  updateProduct(product, id) {
    console.log(id + "THIS IS DATA SERVICE UPDATE ID")
    console.log(product + " This is the ID");
    return this.http.put(`https://localhost:44365/api/product/${id}`, product)
  }
  deleteProduct(product) {
    console.log(product.id + " Hitting Delete Service");
    return this.http.delete(`https://localhost:44365/api/product/${product.id}`)
    };

}
