import fetch from "node-fetch"
import uploadImageFromUrl from "./upload_image.js"

const changeImagePath = async (token, product) => {
    try {
        const imagesArray = product.photos
        if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
            throw new Error("Ürün fotoğrafı yüklemek zorundasınız.")
        }

        const newImagesArray = []
        for (const element of imagesArray) {
            const url = element.url
            const newUrl = await uploadImageFromUrl(url, token)

            if (newUrl) {
                newImagesArray.push({
                    order: element.order,
                    url: newUrl.path
                })
            } else {
                throw new Error(newUrl)
            }
        }

        let newProduct = product
        newProduct.photos = newImagesArray

        return newProduct
    } catch (error) {
        throw new Error(error)
    }
}

export default async function addProduct(token, product) {
    const url = "https://tedarik-api.pttavm.com/product/add"

    try {
        const changeImagePathJob = await changeImagePath(token, product)
        const newProduct = changeImagePathJob

        const response = await fetch(url, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
                accept: "*/*"
            },
            body: JSON.stringify(newProduct)
        })

        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Ürün eklenemedi.\n Ürün bilgisi : ${product}\n ${error}`)
    }
}