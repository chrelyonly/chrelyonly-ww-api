import {loginQr, loginQrCheck, loginQrKey} from "./loginService.js";
import {error} from "qrcode-terminal";


let loginFlagInterval = null;

const startLogin = (key,qrData) => {
    console.log("二维码")
    console.log(qrData)
    loginFlagInterval = setInterval(()=>{
        console.log("检查登录中...")
        loginQrCheck(key).then((res) => {
            console.log("登陆成功...")
            console.log(res)
        },(err) => {
            console.log("登陆确认中...")
            console.log(err)
        })
    },2000)
}
/**
 * 一键登录操作
 */
export const autoLogin = () => {
// 获取登录key
    loginQrKey().then(key => {
        // 根据key获取二维码
        loginQr(key).then(qrData => {
            startLogin(key,qrData);
        })
    },err => {
        console.log("获取登录二维码失败")
        console.log(err)
    })
}