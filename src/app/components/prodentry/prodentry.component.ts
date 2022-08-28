import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INITIAL_STATE } from '@ngrx/store';
import { INITPROD, Product } from 'src/app/models/products.models';

@Component({
  selector: 'app-prodentry',
  templateUrl: './prodentry.component.html',
  styleUrls: ['./prodentry.component.scss']
})
export class ProdentryComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  @Input() entry:Product = INITPROD;
  @Input() editMode:boolean = false;
  @Input() isNew = false;

  entryForm:FormGroup = this.fb.group({
    code: ['xx', Validators.required],
    name: ['', Validators.required],
    baseprice: [0, Validators.required],
    tax: [0.21, Validators.required],
    totalprice: [0, Validators.required]
  })


  ngOnInit(): void {
    this.entryToForm();
    this.setFormEnable(this.editMode);
  }

  entryToForm(){
    this.entryForm.get('code')?.setValue(this.entry.code);
    this.entryForm.get('name')?.setValue(this.entry.name);
    this.entryForm.get('baseprice')?.setValue(this.entry.baseprice);
    this.entryForm.get('tax')?.setValue(this.entry.tax);
  }

  setFormEnable(enable:boolean){
    
    if(enable){
      Object.keys(this.entryForm.controls).forEach(key => {
        this.entryForm.controls[key].enable();
      });
    }else{
      Object.keys(this.entryForm.controls).forEach(key => {
        this.entryForm.controls[key].disable();
      });
    }
    
    
  }

  editEntry(){
    console.log(this.entry);
    this.editMode = true;
    this.setFormEnable(this.editMode);    
  }

  cancelEdit(){
    this.entryToForm();
    this.editMode = false;
    this.setFormEnable(this.editMode);
  }

  saveEntry(){
    
      // code: this.productForm.controls.code.value
      this.entry.code = this.entryForm.get('code')?.value,
      this.entry.name = this.entryForm.get('name')?.value,
      this.entry.baseprice = this.entryForm.get('baseprice')?.value,
      this.entry.tax = this.entryForm.get('tax')?.value,
      this.entry.totalprice = this.entryForm.get('baseprice')?.value * (1 + this.entryForm.get('tax')?.value)    
    if(this.isNew){
      //push entry directly
    }else{
      // find and replace
    }
    


  }

  

  saveItem(){

  }


}
