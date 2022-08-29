import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from './../../models/products.models';
import * as fromProd from './../../store/products.reducers';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {


  products$!: Observable<Product[]>;       //current products saved in list.
  totalbase$!: Observable<number>;
  totaltaxed$!: Observable<number>;

  
  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.store.select(fromProd.selectProducts);    
    this.totalbase$ = this.products$.pipe( map(prod=> prod.reduce((total,item)=>total + item.baseprice,0)));
    this.totaltaxed$ = this.products$.pipe( map(prod=> prod.reduce((total,item)=>total + item.totalprice,0)));
  }

  back(){
    this.router.navigate(['/products']);
  }

}
