import fetch from "node-fetch"

export default async function getProductDetails(token, productId) {

    const url = `https://tedarik-api.pttavm.com/product/detail/${productId}`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
                accept: "*/*"
            },
        })

        const data = await response.json()

        if (data.status) {
            return data
        } else {
            throw new Error(JSON.stringify(data))
        }
    } catch (error) {
        console.error(error)
    }
}