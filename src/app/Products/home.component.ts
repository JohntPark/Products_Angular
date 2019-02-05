import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayUpdate="none";
  displayDelete="none";
  products: Object;
  messageForm: FormGroup;
  messageFormUpdate: FormGroup;
  submitted = false;
  success = false;
  product = null;
  
  constructor(private data: DataService, private formBuilder: FormBuilder) { }

  @Input() id: string

  ngOnInit() {

    this.messageForm = this.formBuilder.group({
      id: [this.products],
    });

    this.messageFormUpdate = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.data.getProducts().subscribe(data=> {
      this.products = data
      console.log(data);
    })
  }
  
  onCloseHandled(){
    this.displayUpdate='none'; 
    this.displayDelete="none";
    this.messageForm.reset();
    this.submitted = false;
    this.success = false;
  }
  openModalUpdate(id) {
  console.log(id + "This is the update field ID");
  this.id = id;
  this.displayUpdate = "block";
  }
  
  
   onCloseHandledUpdate(id){
     console.log(id + 'this is the product')
     this.displayUpdate='none'; 
     console.log("HIT THE UPDATECLOSEHANDLED")
     if(this.messageFormUpdate.invalid) {
       return;
     }
     var product = this.messageFormUpdate.value;
     console.log(product, id);
     this.data.updateProduct(product, id).subscribe(x => {
       console.log(x);
       this.data.getProducts().subscribe(data=> {
        this.products = data
        console.log(data);
     })
    })
  }
    
    
    openModalDelete(id) {
      console.log(id + "This is the id");
      this.id = id;
      this.displayDelete = "block";
    }

    
    onCloseHandledDelete(id){
      console.log("id in close handled delete = " + id);
      var product = {
        id
      };
      this.displayDelete="none";
      console.log("HIT THE DELETECLOSEHANDLED")
      this.data.deleteProduct(product).subscribe(x => {
        this.product = x;
        this.data.getProducts().subscribe(data=> {
          this.products = data
          console.log(data);
        })
      });
    }

  onSubmit() {
    this.submitted=true;
    if(this.messageForm.invalid) {
      return;
    }
    this.success = true;
    var formProduct = this.messageForm.value;
    this.data.getProductById(formProduct).subscribe( x => {
      this.product = x;
    })
  }

  // onSubmitUpdate() {
  //   this.submitted=true;
  //   if(this.messageFormUpdate.invalid) {
  //     return;
  //   }
  //   this.success = true;
  //   var product = this.messageFormUpdate.value;
  //   console.log(product.id + "Here is the product ID");
  //   this.data.updateProduct(product);
  //   console.log("hitting the onsubmitupdate")
  // }
}
