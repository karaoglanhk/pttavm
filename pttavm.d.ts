declare module 'pttavm' {
    export default class pttavm {
        constructor(
            loginUsername: string,
            loginPassword: string
        );

        addProduct(productData: object): Promise<any>;
        getCategoryList(): Promise<any>;
        getListedProducts(): Promise<any>;
        getProductDetails(productId: any): Promise<any>;
        updateProduct(productData: object): Promise<any>;
    }
}