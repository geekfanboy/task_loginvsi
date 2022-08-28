
import { Product } from './../models/products.models';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ProdActions from './products.actions';
import { ConditionalExpr } from '@angular/compiler';
import { state } from '@angular/animations';
import { ProductsComponent } from '../pages/products/products.component';
import { ContentChild } from '@angular/core';


export interface State {
    products: Product[],
    //basetotal: number,
    //total: number
}

export const initialState: State = {
    products: [],
    //basetotal: 0,
   // total: 0
}

const _productReducer = createReducer(
    initialState,
    on(ProdActions.addProduct, (state, { product }) => {
        return { ...state, products: [...state.products, product] }
    }),

    on(ProdActions.saveProduct, (state, { product }) => {
        //state.products.map(
        //    (obj, i) => obj.id === product.id ? { product }: obj);
        //console.log(newProds);

        let newProd =  state.products.map(
            (content) => {
                if(content.id === product.id){
                    return product;
                }else{
                    return content;
                } 
        });        

        return {...state, products: newProd}
        
    }
    ),

    on(ProdActions.deleteProduct, (state, { id }) => {

        console.log(state.products);

        const newProds = state.products.filter((obj) => {
            return obj.id != id;
        });

        console.log(newProds);

        return { ...state, products: newProds }
    }
    )


    //  state.products.map(
    //       (content, i) => content.id === product.id ? { product }
    //      : content
    //)
    // const index = state.products.map(object => object.id).indexOf('product.id');

    //return { ...state, products: [] }
    /*   return {
           products: state.products.map((prod) => {
               prod.id == product.id ? product : prod
           })
       }
   */

    //}
    //)


)


export function productReducer(state: State | undefined, action: Action) {
    return _productReducer(state, action);
};

export const selectProdState = createFeatureSelector<State>('product');
export const selectProducts = createSelector(selectProdState, res => res.products);