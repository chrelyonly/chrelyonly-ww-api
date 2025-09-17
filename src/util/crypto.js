import CryptoJS from "crypto-js"
// const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
// const presetKey = '0CoJUm6Qyw8W8jud'
const iv = '0102030405060708'
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