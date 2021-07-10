import axios from "axios";
import {Toast} from 'vant';
// import NProgress from "accessible-nprogress";
import {baseUrl} from "./env";

const baseURL = baseUrl

const http = axios.create({
    // baseURL,
    timeout: 10000,
})
http.defaults.withCredentials = true;

// 前置拦截器（发起请求之前的拦截）
http.interceptors.request.use(
    (res) => {
        http.defaults.headers['X-Requested-With'] = "XMLHttpRequest";
        http.defaults.headers.post["Content-Type"] = "application/json";
        // NProgress.start()
        return res
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
http.interceptors.response.use(
    (res) => {
        // NProgress.done()
        return res
    },
    (error) => {
        // NProgress.done()
        if (error.response && error.response.data) {
            const code = error.response.status;
            const msg = error.response.data.message;
            // Toast.fail(`Code: ${code}, Message: ${msg}`);
            console.log(code + '+' + msg)
            console.error(`[Axios Error]`, error.response);

        } else {
            // Toast.fail(`${error}`);
            console.log(error)
        }
        return Promise.reject(error);
    }
)
export default http
