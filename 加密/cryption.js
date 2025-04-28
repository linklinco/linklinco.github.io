// 前端AES加密文本

// 把buffer转为base64格式
function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// 反向转换
function base64ToArrayBuffer(base64) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}
// 根据密码生成key，因为这个代码只有自己用，所以没有设置salt
async function deriveAESKeyFromPassword(password, salt = "uniqueUserSalt123") {
    // 1. 准备盐值（应该每个用户唯一）
    const saltBuffer = new TextEncoder().encode(salt);

    // 2. 导入密码作为基础密钥材料
    const passwordBuffer = new TextEncoder().encode(password);
    const baseKey = await window.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    // 3. 派生密钥
    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: 100000,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 }, // 要生成的密钥类型
        true, // 是否可导出
        ["encrypt", "decrypt"] // 密钥用途
    );
    return derivedKey;
}

async function generateDeterministicIV(data, salt = "") {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data + salt);
    const hash = await window.crypto.subtle.digest("SHA-256", dataBuffer);
    return new Uint8Array(hash).slice(0, 12);
}
// 异步加密函数，可以在回调和返回值拿到加密后的数据
async function encryptData(plaintext, key, callback) {
    const iv = await generateDeterministicIV(key);
    key = await deriveAESKeyFromPassword(key);
    const encoded = new TextEncoder().encode(plaintext);
    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encoded
    );
    let text = arrayBufferToBase64(ciphertext)
    callback(text);
    return text;
}

// 异步解密函数，可以在回调函数和返回值拿到解密后的数据
async function decryptData(encryptedData, key, callback) {
    const iv = await generateDeterministicIV(key);
    key = await deriveAESKeyFromPassword(key);
    const ciphertextArray = base64ToArrayBuffer(encryptedData);
    try {
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            new Uint8Array(ciphertextArray)
        );
        callback(new TextDecoder().decode(decrypted));
        return new TextDecoder().decode(decrypted);
    } catch (error) {
        callback("解密错误，请重试！")
        return "解密错误，请重试！";
    }
}