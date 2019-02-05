import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  display="none";
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private data: DataService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled(){
    this.display='none'; 
    this.messageForm.reset();
    this.submitted = false;
    this.success = false;
 }

  onSubmit() {
    this.submitted=true;
    if(this.messageForm.invalid) {
      return;
    }
    this.success = true;
    var product = this.messageForm.value;
    this.data.postProduct(product);
  }

}
