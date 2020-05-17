//封装网络请求数据

export const request = (params) => {
    return new Promise((resolve, reject) => {
        const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: function (res) {
                resolve(res)
            },
            fail: function () {
                reject(err)
            },
        })
    })
}