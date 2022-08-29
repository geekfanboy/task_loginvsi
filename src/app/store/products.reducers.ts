
import { Product } from './../models/products.models';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ProdActions from './products.actions';

export interface State {
    products: Product[],
}

export const initialState: State = {
    products: [],
}

const _productReducer = createReducer(
    initialState,
    on(ProdActions.addProduct, (state, { product }) => {
        return { ...state, products: [...state.products, product] }
    }),

    on(ProdActions.saveProduct, (state, { product }) => {

        let newProd = state.products.map(
            (content) => {
                if (content.id === product.id) {
                    return product;
                } else {
                    return content;
                }
            });

        return { ...state, products: newProd }

    }),

    on(ProdActions.deleteProduct, (state, { id }) => {

        const newProds:Product[] = state.products.filter((obj) => {
            return obj.id != id;
        });

        return { ...state, products: newProds }
    }),

    on(ProdActions.clearTransients, (state) => {

        const newProds = state.products.filter((obj) => {
            return !obj.transient;
        });

        return { ...state, products: newProds }
    })



)


export function productReducer(state: State | undefined, action: Action) {
    return _productReducer(state, action);
};

export const selectProdState = createFeatureSelector<State>('products');
export const selectProdFullState = createSelector(selectProdState, res => res);
export const selectProducts = createSelector(selectProdState, res => res.products);