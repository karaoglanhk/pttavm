import fetch from "node-fetch";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, answer => {
            resolve(answer);
        });
    });
}

export default async function getToken(loginUsername, loginPassword) {
    const url = 'https://tedarik-api.pttavm.com/user/login';

    const username = loginUsername;
    const password = loginPassword;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "*/*"
            },
            body: JSON.stringify({
                username,
                password,
                remember: 0,
            })
        });

        const loginData = await response.json();
        if (!loginData.status) {
            throw new Error(loginData.message);
        }

        const verificationId = loginData.data.verification_id;
        const phone = loginData.data.phone;

        const otpCode = await askQuestion(`${phone} numaralı telefona gönderilen kodu girin: `);

        const verifyResponse = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "*/*"
            },
            body: JSON.stringify({
                activation_code: otpCode,
                verification_id: verificationId,
                username,
                password,
                remember: 0,
            })
        });

        rl.close();

        const tokenData = await verifyResponse.json();

        if (tokenData.status) {
            return {
                token: tokenData.data.token,
                shopId: tokenData.data.shop_id
            };
        } else {
            throw new Error(`Hatalı OTP kodu girdiniz. Girdiğiniz kod: ${otpCode}`);
        }

    } catch (err) {
        console.error("Token alma hatası: ", err.response?.data || err.message);
        throw err;
    }
}