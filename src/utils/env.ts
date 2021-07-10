let baseUrl = "";
let imgBaseUrl = "";
if (process.env.NODE_ENV == "development") {
    baseUrl = "//elm.cangdu.org";
    imgBaseUrl = "//elm.cangdu.org/img/";
    // baseUrl = "//localhost:8001"
    // imgBaseUrl = "//localhost:8001/img/"
} else if (process.env.NODE_ENV == "production") {
    baseUrl = "//elm.cangdu.org";
    imgBaseUrl = "//elm.cangdu.org/img/";
    // baseUrl = "//localhost:8001"
    // imgBaseUrl = "//localhost:8001/img/"
}
export {baseUrl, imgBaseUrl};
