//导入网络数据模块
import {
    request
} from '../../request/request.js'

// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //左边分类数据
        catesLeft: [],
        //右边分类数据
        catesRight: [],
        currentIndex: 0,
        //滚动顶部文字
        scrollTop: 0
    },
    //返回接口数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //获取缓存数据
        const CatesSync = wx.getStorageSync('cates')
        if (!CatesSync) {
            //当没有缓存，则发送数据
            this.getCategory()
        } else {
            if (Date.now() - CatesSync.time > 300000) {
                //当缓存数据过期，从新发送数据，过期时间为5分钟
                this.getCategory()
            } else {
                //使用缓存的旧数据
                this.Cates = CatesSync.data;
                //当有缓存，则渲染左右栏的数据
                let catesLeft = this.Cates.map(v => v.cat_name)
                let catesRight = this.Cates[0].children;
                this.setData({
                    catesLeft,
                    catesRight
                })
            }
        }
    },

    //获取分类页面数据
    getCategory() {
        request({
            url: '/categories'
        }).then(res => {
            //this.Cates 把分类页面分成左右两边数据
            this.Cates = res.data.message;

            //设置数据缓存技术
            wx.setStorageSync('cates', {
                time: Date.now(), //时间
                data: this.Cates //数据
            })

            //map()方法构造左边数据
            let catesLeft = this.Cates.map(v => v.cat_name)

            //构造右边数据
            let catesRight = this.Cates[0].children;
            this.setData({
                catesLeft,
                catesRight
            })
        })
    },

    //文字点击事件
    itemChange(e) {
        //获取索引
        const {
            index
        } = e.currentTarget.dataset;

        //点击左边文字渲染对应的右边商品内容（重要）
        let catesRight = this.Cates[index].children;

        this.setData({
            currentIndex: index,
            catesRight,
            scrollTop: 0
        })
    },


  
})