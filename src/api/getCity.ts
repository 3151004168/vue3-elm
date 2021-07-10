export async function getCity(actx: any, type: string) {
    const {data} = await actx.$http('v1/cities', {
        params: {
            type: type
        }
    })
    return data
}
export async function getAddress(actx:any,id:number,keyword:string) {
    const {data} =await actx.$http('/v1/pois',{
        params:{
            city_id:id,
            keyword:keyword
        }
    })
    return data
}
