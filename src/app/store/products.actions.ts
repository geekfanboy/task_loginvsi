import { Injectable } from "@angular/core";
import { createAction, props } from "@ngrx/store";
import { Product } from "./../models/products.models";

export enum ProductActionTypes {
    PRD_ADD = "[Products] Add Item",
    PRD_DEL = "[Products] Delete Item",
    PRD_SAV = "[Products] Save Item",
    PRD_CLR = "[Products] Clear Transients"
}

export const addProduct = createAction(
    ProductActionTypes.PRD_ADD,
    props<{ product:Product }>()
);

export const saveProduct = createAction(
    ProductActionTypes.PRD_SAV,
    props<{ product:Product }>()
);


export const deleteProduct = createAction(
    ProductActionTypes.PRD_DEL,
    props<{ id:string }>()
);

export const clearTransients = createAction(
    ProductActionTypes.PRD_CLR
);

