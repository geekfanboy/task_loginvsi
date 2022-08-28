import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { INITPROD, Product } from 'src/app/models/products.models';
import * as ProdActions from 'src/app/store/products.actions';

@Component({
  selector: 'app-prodentry',
  templateUrl: './prodentry.component.html',
  styleUrls: ['./prodentry.component.scss']
})
export class ProdentryComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store, private currencyPipe: CurrencyPipe) { }

  @Input() entry: Product = INITPROD;
  @Input() editMode: boolean = false;
  @Input() isNew = false;

  entryForm: FormGroup = this.fb.group({
    code: ['xx', Validators.required],
    name: ['', Validators.required],
    baseprice: [0, Validators.required],
    tax: [21, Validators.required],
    totalprice: [0, Validators.required]
  })


  ngOnInit(): void {
    this.entryToForm();
    //this.setFormEnable(this.editMode);
    this.setEditMode(this.entry.transient);
  }

  //copy input entry to form fields
  entryToForm() {
    this.entryForm.get('code')?.setValue(this.entry.code);
    this.entryForm.get('name')?.setValue(this.entry.name);
    this.entryForm.get('baseprice')?.setValue(this.entry.baseprice);
    this.entryForm.get('tax')?.setValue(this.entry.tax);
  }



  //set if editable or not
  setEditMode(enable: boolean) {
    this.editMode = enable;
    this.setFormEnable(enable);
  }

  // enable / disable form controls
  setFormEnable(enable: boolean) {
    if (enable) {
      Object.keys(this.entryForm.controls).forEach(key => {
        this.entryForm.controls[key].enable();
      });
    } else {
      Object.keys(this.entryForm.controls).forEach(key => {
        this.entryForm.controls[key].disable();
      });
    }
  }

  // make entry editable
  editEntry() {
    console.log(this.entry);
    this.setEditMode(true);
  }

  // ignore all unsaved changes
  cancelEdit() {
    this.entryToForm();
    this.setEditMode(false);
  }

  //save current entry to product list
  saveEntry() {

    const product: Product = {
      id: this.entry.id,
      code: this.entryForm.get('code')?.value,
      name: this.entryForm.get('name')?.value,
      baseprice: this.entryForm.get('baseprice')?.value,
      tax: this.entryForm.get('tax')?.value,
      totalprice: this.entryForm.get('baseprice')?.value * ((100 + this.entryForm.get('tax')?.value)/100),
      transient: false
    }

    console.log(product);

    this.store.dispatch(ProdActions.saveProduct({ product }));
    this.entry = product;
    this.setEditMode(false);
  }

  deleteEntry() {
    console.log('deletemje')
    this.store.dispatch(ProdActions.deleteProduct({ id: this.entry.id }));
  }

  transformAmount(element: any) {
    console.log(element)
    const formattedAmount = this.currencyPipe.transform(this.entryForm.get('baseprice')?.value, '$');
    console.log(formattedAmount);
    element.target.value = formattedAmount;
  }

  onlyNumberKey(event: any) {
    let charCode = (event.query) ? event.query : event.keyCode;
    console.log(event)
    console.log(charCode);


    if((charCode > 47 && charCode < 58)){
      return true;
    }
    if(charCode == 44){
      console.log(event.target.value);
      if(event.target.value.includes(",")){
        console.log('her');
        return false
      }else{
        return true;
      }
    }
    return false;
  }




}
