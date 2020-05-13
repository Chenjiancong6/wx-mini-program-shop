//封装网络请求数据

export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success: function(res){
               resolve(res)
            },
            fail: function() {
               reject(err)
            },
        })
    })
}