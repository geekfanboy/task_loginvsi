import { Injectable } from "@angular/core";
import { createAction, props } from "@ngrx/store";
import { Product } from "./../models/products.models";

export enum ProductActionTypes {
    PRD_ADD = "[Products] Add Item",
    PRD_DEL = "[Products] Delete Item",
    PRD_SAV = "[Products] Save Item",
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

/*
export const deleteProduct = createAction(
    ProductActionTypes.PRD_DEL,
    props<{ product:Product }>()
);


export const editProduct = createAction(
    ProductActionTypes.PRD_EDIT,
    props<{ product:Product }>()
)
*/