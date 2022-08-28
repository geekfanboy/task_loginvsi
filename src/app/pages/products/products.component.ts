import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './../../models/products.models';
import * as fromProd from './../../store/products.reducers';
import { ProdentryComponent } from 'src/app/components/prodentry/prodentry.component';
import { v4 as uuid4} from 'uuid';
import * as ProdActions from './../../store/products.actions'
import { map, Observable, reduce } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ ProdentryComponent]
})
export class ProductsComponent implements OnInit {

  constructor(private store: Store) { }

  products$!: Observable<Product[]>;       //current products saved in list.
  totalbase$!: Observable<number>;
  totaltaxed$!: Observable<number>;

  newproducts: Product[] = [];    //new products. transient

  ngOnInit(): void {

    this.products$ = this.store.select(fromProd.selectProducts);
    this.totalbase$ = this.products$.pipe( map(prod=> prod.reduce((total,item)=>total + item.baseprice,0)));
    this.totaltaxed$ = this.products$.pipe( map(prod=> prod.reduce((total,item)=>total + item.totalprice,0)));

    //this.totalbase$ = this.store.select(fromProd.selectProducts).map(order => order.reduce((total, price) => total + price, 0)
    
    //this.store.select(fromProd.selectProducts).subscribe(products => {
    //  this.products = products
    //})
    
    }

  createProd(){
    const product:Product ={
      id: uuid4().toString(),
      code: Date.now().toString(),
      name: "New Product",
      baseprice: 0.00,
      tax: 21,
      totalprice: 0.00,
      transient: true
    }
    this.store.dispatch(ProdActions.addProduct({ product }));
    //this.newproducts.push(product);
  }
}
