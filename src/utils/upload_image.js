import fetch from "node-fetch";

export default async function uploadImageFromUrl(imageUrl, token) {
    try {
        const res = await fetch(imageUrl);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        const uploadResponse = await fetch('https://tedarik-api.pttavm.com/product/image/upload', {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json",
                "accept": "*/*",
                "origin": "https://tedarikci.pttavm.com",
                "referer": "https://tedarikci.pttavm.com/"
            },
            body: JSON.stringify({
                image: base64Image
            })
        });

        const data = await uploadResponse.json();
        if (data.status) {
            return data
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        throw new Error(error)
    }
}