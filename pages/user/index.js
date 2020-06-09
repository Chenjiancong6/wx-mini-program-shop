// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //获取从缓存过来的数据
        userinfo: {},
        //收藏的数量
        collectNum: 0
    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //1.获取缓存数据
        const userinfo = wx.getStorageSync("userinfo");

        //获取收藏的数量
        const collect = wx.getStorageSync('collect') || [];

        //2.把缓存数据存放到data中
        this.setData({
            userinfo,
            collectNum: collect.length
        })
    },


})