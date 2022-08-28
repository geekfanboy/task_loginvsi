
import { Product } from './../models/products.models';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ProdActions from './products.actions';
import { ConditionalExpr } from '@angular/compiler';


export interface State {
    products: Product[];
}

export const initialState: State = {
    products : []
}

const _productReducer = createReducer(
    initialState,
    on(ProdActions.addProduct, (state, {product}) =>{
        console.log(product);
        console.log(state);
        return {...state, products: [...state.products, product]}    
    })
)


export function productReducer(state: State | undefined, action: Action){
    return _productReducer(state, action);
};

export const selectProdState = createFeatureSelector<State>('product');
export const selectProducts = createSelector(selectProdState, res => res.products);
