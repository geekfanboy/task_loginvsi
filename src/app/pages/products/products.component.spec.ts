import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {Location} from '@angular/common';
import { ProductsComponent } from './products.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BillComponent } from '../bill/bill.component';
import { count } from 'rxjs';
import * as fromReducer from './../../store/products.reducers';
import * as fromActions from './../../store/products.actions';
import { productReducer } from './../../store/products.reducers';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore<{ products: [] }>;
  const initialState = { products: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [
        StoreModule.forRoot({products:productReducer}),
        RouterTestingModule.withRoutes(  [
          {path:'bill', component:BillComponent}
        ])]
      })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should navigate to /bill on button click', fakeAsync(() =>{
    const location = TestBed.get(Location);
    const btn = fixture.nativeElement.querySelector("#btn-continue");
    btn.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/bill');      
  })
  )
  


});
