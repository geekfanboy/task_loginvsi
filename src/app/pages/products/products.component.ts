import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProdActions from './../../store/products.actions';
import { Product } from './../../models/products.models';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromProd from './../../store/products.reducers';
import { ProdentryComponent } from 'src/app/components/prodentry/prodentry.component';
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ ProdentryComponent]
})
export class ProductsComponent implements OnInit {

  constructor(private store: Store, private fb: FormBuilder) { }



  products: Product[] = [];
  newproducts: Product[] = [];



  productForm:FormGroup = this.fb.group({
    code: ['XXX', Validators.required],
    name: ['XXX', Validators.required],
    baseprice: [0, Validators.required],
    tax: [0.21, Validators.required],
    totalprice: [0, Validators.required]
  })

  ngOnInit(): void {
    this.store.select(fromProd.selectProducts).subscribe(products => {
      this.products = products
    })
  }

  addItem(){
    //this.store.dispatch(product)
    const product:Product ={
      // code: this.productForm.controls.code.value
      id: uuidv4().toString(),
      code: this.productForm.get('code')?.value,
      name: this.productForm.get('name')?.value,
      baseprice: this.productForm.get('baseprice')?.value,
      tax: this.productForm.get('tax')?.value,
      totalprice: this.productForm.get('baseprice')?.value * (1 + this.productForm.get('tax')?.value)
    }

    this.store.dispatch(ProdActions.addProduct({product}))
  }

  newProd(){
    const uuid = uuidv4().toString(); 
    const product:Product = {
      // code: this.productForm.controls.code.value
      id: uuid,
      code: uuid,
      name: "New Product",
      baseprice: this.productForm.get('baseprice')?.value,
      tax: this.productForm.get('tax')?.value,
      totalprice: this.productForm.get('baseprice')?.value * (1 + this.productForm.get('tax')?.value)
    }
    this.newproducts.push(product);
  }

  saveItem(){
    const product:Product ={
      // code: this.productForm.controls.code.value
      id: uuidv4().toString(),
      code: this.productForm.get('code')?.value,
      name: this.productForm.get('name')?.value,
      baseprice: this.productForm.get('baseprice')?.value,
      tax: this.productForm.get('tax')?.value,
      totalprice: this.productForm.get('baseprice')?.value * (1 + this.productForm.get('tax')?.value)
    }

    console.log(product);

    this.store.dispatch(ProdActions.addProduct({product}));
  }

}
