import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { BillComponent } from './pages/bill/bill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products.reducers';
import { ProdentryComponent } from './components/prodentry/prodentry.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BillComponent,
    ProdentryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({product:productReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
