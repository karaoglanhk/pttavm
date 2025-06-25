import fetch from "node-fetch"

export default async function getCategoryList(token) {
    const url = 'https://tedarik-api.pttavm.com/category/list'
    try {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
                accept: "*/*"
            },
            body: JSON.stringify({
                select: ["id", "name"]
            })
        })

        const data = await response.json()
        if (data.status) {
            return data
        } else {
            throw new Error("Kategori listesi çekilemedi: " + JSON.stringify(data))
        }

    } catch (error) {
        console.error("Kategori listesi çekilemedi:" + error.message);
    }
}