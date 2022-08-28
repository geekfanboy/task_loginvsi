import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdentryComponent } from './prodentry.component';

describe('ProdentryComponent', () => {
  let component: ProdentryComponent;
  let fixture: ComponentFixture<ProdentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdentryComponent ]
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
