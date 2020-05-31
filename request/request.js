//封装网络请求数据

let ajaxTime = 0; //同时发送异步代码的次数
export const request = (params) => {
    //显示加载中的效果
    ajaxTime++;
    wx.showLoading({
        title: "数据加载中",
        mask: true,
    });

    return new Promise((resolve, reject) => {
        const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: function (res) {
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            },
            complete: function () {
                ajaxTime--;
                if (ajaxTime === 0) {
                    //当数据出来后，隐藏加载图标
                    wx.hideLoading();
                }
            }
        })
    })
}