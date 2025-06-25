import fetch from "node-fetch"
import getProductDetails from "./get_product_details.js"

export default async function getListedProducts(token) {
    const url = "https://tedarik-api.pttavm.com/product/list"

    try {

        let start = 0
        let length = 100
        let continueJob = true

        const productList = []

        do {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                    accept: "*/*"
                },
                body: JSON.stringify({
                    start,
                    length,
                    search: "",
                    search_columns: ["name", "price", "commission_ratio", "desi", "fast_editing"],
                    order: "desc",
                    order_columns: "id",
                    filter: {}
                })
            })

            const data = await response.json()
            const count = data.data.length
            const products = data.data
            if (products.length !== 0) {
                products.forEach(element => {
                    productList.push(element)
                });
            }

            if (count < length) {
                continueJob = false

                for (const product of productList) {
                    const id = product.id
                    const productDetails = await getProductDetails(token, id)

                    product.productDetails = productDetails
                }

                return {
                    productCount: productList.length,
                    products: productList
                }
            } else {
                start += length
            }

        } while (continueJob);

    } catch (error) {
        console.error("Ürün Listesi Çekilemedi" + error)
    }
}