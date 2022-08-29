import { Product } from '../models/products.models';
import * as fromActions from './products.actions';
import * as fromReducer from './products.reducers';

describe('productReducer', () => {
    describe('unknown action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer
            const action = {
                type: 'Unknown'
            };
            const state = fromReducer.productReducer(initialState, action);
            expect(state).toBe(initialState);
        });
    });
    describe('new item added state should change', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const product: Product = {
                id: '3434546',
                code: 'JNHKJS234',
                name: 'Sample Entrt',
                baseprice: 100,
                tax: 0.21,
                totalprice: 121,
                transient: false
            };

            const action = fromActions.addProduct({ product });
            const state = fromReducer.productReducer(initialState, action);
            expect(state).not.toBe(initialState);
        });
    });
    describe('new item added then deleteed. state should revert', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const product: Product = {
                id: '3434546',
                code: 'JNHKJS234',
                name: 'Sample Entrt',
                baseprice: 100,
                tax: 0.21,
                totalprice: 121,
                transient: false
            };

            const action = fromActions.addProduct({ product });
            const state = fromReducer.productReducer(initialState, action);

            const action2 = fromActions.deleteProduct({ id:product.id });
            const state2 = fromReducer.productReducer(state, action2);

            expect(state2).toEqual(initialState);
        });
    });
    describe('purge should remove transient items from store', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const product: Product = {
                id: '3434546',
                code: 'JNHKJS234',
                name: 'Sample Entrt',
                baseprice: 100,
                tax: 0.21,
                totalprice: 121,
                transient: true
            };

            const action = fromActions.addProduct({ product });
            const state = fromReducer.productReducer(initialState, action);

            const action2 = fromActions.clearTransients();
            const state2 = fromReducer.productReducer(state, action2);

            expect(state2).toEqual(initialState);
        });
        
    });
    describe('purge should NOT remove transient=false items from store', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const product: Product = {
                id: '3434546',
                code: 'JNHKJS234',
                name: 'Sample Entrt',
                baseprice: 100,
                tax: 0.21,
                totalprice: 121,
                transient: false
            };

            const action = fromActions.addProduct({ product });
            const state = fromReducer.productReducer(initialState, action);

            const action2 = fromActions.clearTransients();
            const state2 = fromReducer.productReducer(state, action2);

            expect(state2).not.toEqual(initialState);
        });
        
    });


});
