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
     this.displayUpdate='none'; 
     if(this.messageFormUpdate.invalid) {
       return;
     }
     var product = this.messageFormUpdate.value;
     this.data.updateProduct(product, id).subscribe(x => {
       console.log(x);
       this.data.getProducts().subscribe(data=> {
        this.products = data
     })
    })
  }
    
    
    openModalDelete(id) {
      this.id = id;
      this.displayDelete = "block";
    }

    
    onCloseHandledDelete(id){
      var product = {
        id
      };
      this.displayDelete="none";
      this.data.deleteProduct(product).subscribe(x => {
        this.product = x;
        this.data.getProducts().subscribe(data=> {
          this.products = data
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
}
