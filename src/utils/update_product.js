export default async function updateProduct(token, product) {

    const productId = product.product_id
    if (!productId) { throw new Error("Product objesi product_id değerini içermiyor.") }

    const url = `https://tedarik-api.pttavm.com/product/update/${productId}`
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
                accept: "*/*"
            },
            body: JSON.stringify(product)
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}