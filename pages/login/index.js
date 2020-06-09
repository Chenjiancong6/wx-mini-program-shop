// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    /**
     * 调用登录时用户个人信息
     */
    bindGetUserInfo(e) {
        //获取登录信息
        const {
            userInfo
        } = e.detail;
        //把获取到的信息保存到缓存里
        wx.setStorageSync("userinfo", userInfo);

        //返回跳转前的页面
        wx.navigateBack({
            delta: 1
        });

    }

})