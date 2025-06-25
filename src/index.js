import getCategoryList from "./utils/get_category_list.js";
import getListedProducts from "./utils/get_listed_products.js";
import getToken from "./utils/get_token.js";
import addProduct from "./utils/add_product.js";
import getProductDetails from "./utils/get_product_details.js";
import updateProduct from "./utils/update_product.js";

class PttAVM {
    constructor(loginUsername, loginPassword) {
        if (!loginUsername || !loginPassword) {
            throw new Error("Zorunlu bilgiler: loginUsername, loginPassword");
        }
        this.loginUsername = loginUsername;
        this.loginPassword = loginPassword;
        this.token = null;
    }

    async getToken() {
        try {
            if (!this.token) {
                const tokenData = await getToken(this.loginUsername, this.loginPassword)
                this.token = tokenData.token

                if (this.token) {
                    console.log("Token alındı.")
                    return tokenData.token
                }
            } else {
                return this.token
            }
        } catch (error) {
            throw new Error("Token bilgisi alınamadı: " + error.message);
        }
    }

    async addProduct(productData) {
        const token = await this.getToken();
        return await addProduct(token, productData)
    }

    async getCategoryList() {
        const token = await this.getToken();
        return await getCategoryList(token);
    }

    async getListedProducts() {
        const token = await this.getToken();
        return await getListedProducts(token)
    }

    async getProductDetails(productId) {
        const token = await this.getToken();
        return await getProductDetails(token, productId)
    }

    async updateProduct(productData) {
        const token = await this.getToken();
        return await updateProduct(token, productData)
    }
}

export default PttAVM;