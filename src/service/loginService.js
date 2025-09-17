import qrcode from 'qrcode-terminal';
/**
 * 获取二维码key
 */
export const loginQrKey = () => {
    return new Promise((resolve, reject) => {
        let params = {
            type: 3
        }
        $wyyHttps("/login/qrcode/unikey","get",params,2,{}).then((res) => {
            if (res.data.code === 200) {
                resolve(res.data.unikey)
            }else{
                reject(res.data)
            }
        })
    })
}
/**
 * 获取二维码
 */
export const loginQr = (codeKey) => {
    return new Promise((resolve, reject) => {
        const url = `https://music.163.com/login?codekey=${codeKey}`
        // 在终端打印二维码
        qrcode.generate(url, { small: true }, (qrcodeText) => {
            resolve(qrcodeText)
        });
    })
}
/**
 * 检查二维码状态
 */
export const loginQrCheck = (codeKey) => {
    return new Promise((resolve, reject) => {
        let params = {
            key: codeKey,
            type: 3,
        }
        $wyyHttps("/login/qrcode/client/login","get",params,1,{}).then((res) => {
            if (res.data.code === 200) {
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
}