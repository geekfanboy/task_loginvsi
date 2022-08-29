import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ProdentryComponent } from './prodentry.component';

describe('ProdentryComponent', () => {
  let component: ProdentryComponent;
  let fixture: ComponentFixture<ProdentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdentryComponent ],
      imports: [  ReactiveFormsModule, StoreModule.forRoot({}) ],
      providers: [CurrencyPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
