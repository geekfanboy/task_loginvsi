import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INITIAL_STATE, Store } from '@ngrx/store';
import { INITPROD, Product } from 'src/app/models/products.models';
import * as ProdActions from 'src/app/store/products.actions';

@Component({
  selector: 'app-prodentry',
  templateUrl: './prodentry.component.html',
  styleUrls: ['./prodentry.component.scss']
})
export class ProdentryComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private store: Store, private currencyPipe: CurrencyPipe) { }

  @Input() entry: Product = INITPROD;
  @Input() billMode = false;
  @ViewChild('codeInput') codeInputElem !: ElementRef<HTMLInputElement>;
  editMode: boolean = false;


  entryForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    baseprice: ['', Validators.required],
    tax: [21, Validators.required],
    totalprice: [0, Validators.required]
  })


  ngOnInit(): void {
    this.entryToForm();
    this.setEditMode(this.entry.transient);
  }

  ngAfterViewInit(){  
    setTimeout(()=>{  
      this.codeInputElem.nativeElement.focus();},0);  //set focus to 1st input at creation of init  
      
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

    this.store.dispatch(ProdActions.saveProduct({ product }));
    this.entry = product;
    this.setEditMode(false);
  }

  deleteEntry() {
    this.store.dispatch(ProdActions.deleteProduct({ id: this.entry.id }));
  }




}
