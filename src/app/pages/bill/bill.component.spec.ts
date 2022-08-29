import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {Location} from '@angular/common';
import { BillComponent } from './bill.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from '../products/products.component';
import { productReducer } from 'src/app/store/products.reducers';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillComponent ],
      imports: [  StoreModule.forRoot({products:productReducer}),RouterTestingModule.withRoutes(  [
        {path:'products', component:ProductsComponent}
      ])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /products on back button click',fakeAsync(() =>{
    const location = TestBed.get(Location);
    const linkDes = fixture.nativeElement.querySelector("#btn-back");
    linkDes.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/products');
    
  })
  )

});
