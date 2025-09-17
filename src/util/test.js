import forge from 'node-forge';
import {aesEncrypt} from "./crypto.js";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB
-----END PUBLIC KEY-----`
const rsaEncrypt = (str, key) => {
    const forgePublicKey = forge.pki.publicKeyFromPem(key)
    const encrypted = forgePublicKey.encrypt(str, 'NONE')
    return forge.util.bytesToHex(encrypted)
}


/**
 * 将 data 加密成网易云风格的请求参数
 * @param {Object} data 原始请求 data
 * @returns {Object} { params, encSecKey } 加密后的请求体
 */
function encryptData(data) {
    // 1. 把对象序列化成 JSON 字符串
    const jsonStr = JSON.stringify(data);

    // 2. 调用 asrsea 方法进行加密
    const firstKey = "010001"
    const secondKey = "0CoJUm6Qyw8W8jud";

    const result = asrsea(jsonStr, firstKey, secondKey);

    // 3. 把加密结果格式化成查询字符串形式
    return {
        params: result.encText,
        encSecKey: result.encSecKey
    };
}

/**
 * 模拟 asrsea 加密
 * @param {string} text 待加密的文本
 * @param {string} key1 第一把 key
 * @param {string} key2 第二把 key
 * @returns {Object} { encText, encSecKey }
 */
function asrsea(text, key1, key2) {
    let text2 = JSON.stringify(text)
    // 实际加密逻辑可能是 AES + RSA
    // 这里可以简单模拟返回对象结构
    return {
        encText: aesEncrypt(aesEncrypt(text2,"0CoJUm6Qyw8W8jud"),"dhqhwbtbtbqweras"),
        encSecKey: rsaEncrypt("dhqhwbtbtbqweras",publicKey)
    };
}

console.log(encryptData({
    type:1,
    noCheckToken: true,
}))