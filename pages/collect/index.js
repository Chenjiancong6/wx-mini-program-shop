// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //收藏的数据
        collect: [],
        tabList: [{
                id: 0,
                value: '商品收藏',
                isActive: true
            },
            {
                id: 1,
                value: '品牌收藏',
                isActive: false
            },
            {
                id: 2,
                value: '店铺收藏',
                isActive: false
            },
        ],
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //获取收藏的缓存数据
        const collect = wx.getStorageSync('collect');
        //存入data中
        this.setData({
            collect
        })
    },

    /**
     * 导航栏点击
     */
    handleTabItemChange(e) {
        //1 找到当前点击的位置
        let {
            index
        } = e.detail;
        //2 获取导航栏data中的值
        let {
            tabList
        } = this.data;
        //3 循环找到当前的值,修改tabList的值
        tabList.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)

        //4 重新存入缓存中
        this.setData({
            tabList
        })

    },
})