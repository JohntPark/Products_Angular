import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('https://localhost:44365/api/product')
  }
  getProductById(product){
    return this.http.get(`https://localhost:44365/api/product/${product.id}`);
  }
  postProduct(product) {
    return this.http.post('https://localhost:44365/api/product', product).subscribe(x => console.log(x));
  }
  updateProduct(product, id) {
    return this.http.put(`https://localhost:44365/api/product/${id}`, product)
  }
  deleteProduct(product) {
    return this.http.delete(`https://localhost:44365/api/product/${product.id}`)
    };

}
