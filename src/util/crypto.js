import CryptoJS from "crypto-js"
import forge from "node-forge";
import {randomLenStr} from "./util.js";
const iv = '0102030405060708'
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB
-----END PUBLIC KEY-----`
export const aesEncrypt = (text,presetKey) => {
    let encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(text),
        CryptoJS.enc.Utf8.parse(presetKey),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        },
    )
    return encrypted.toString()
}

const rsaEncrypt = (str, key) => {
    const forgePublicKey = forge.pki.publicKeyFromPem(key)
    const encrypted = forgePublicKey.encrypt(str, 'NONE')
    return forge.util.bytesToHex(encrypted)
}
/**
 * 模拟 asrsea 加密
 * @param {string} text 待加密的文本
 * @param secretKey 密药
 * @returns {Object} { encText, encSecKey }
 */
function asrsea(text, secretKey) {
    return {
        encText: aesEncrypt(
            aesEncrypt(text,"0CoJUm6Qyw8W8jud")
            ,secretKey
        ),
        encSecKey: rsaEncrypt(secretKey.split('').reverse().join(''),publicKey)
    };
}
/**
 * 将 data 加密成网易云风格的请求参数
 * @param {Object} data 原始请求 data
 * @returns {Object} { params, encSecKey } 加密后的请求体
 */
export function encryptData(data) {
    const jsonStr = JSON.stringify(data);
    const secretKey = randomLenStr(16);
    const result = asrsea(jsonStr, secretKey);
    return {
        params: result.encText,
        encSecKey: result.encSecKey
    };
}
