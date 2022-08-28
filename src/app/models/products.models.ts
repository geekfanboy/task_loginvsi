export interface Product{
    id: string;
    code: string;
    name: string;
    baseprice: number;
    tax: number;
    totalprice: number,
    transient: boolean
}

export const INITPROD:Product = {
    id : '',
    code : '',
    name : '',
    baseprice : 0,
    tax : 0.21,
    totalprice : 0,
    transient: true
}