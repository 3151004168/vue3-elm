export async function getPicCode(actx: any) {
    const {data} = await actx.$http.post('/v1/captchas')
    return data
}

export async function getLogin(actx: any, url: string, params: object) {
    const {data} = await actx.$http.post('/v2/login', params)
    return data
}
