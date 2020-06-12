// pages/goods_list/index.js

import {
    request
} from '../../request/request.js'
import regeneratorRuntime, {
    async
} from '../../lib/runtime/runtime';


Page({

    //接口要的数据
    queryParams: {
        query: '', //关键字
        cid: '', //分类id
        pagenum: 1, //当前页码
        pagesize: 10 //页容量
    },

    //总页数
    totalPages: 1,
    /**
     * 页面的初始数据
     */
    data: {
        tabList: [{
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 1,
                value: '销量',
                isActive: false
            },
            {
                id: 2,
                value: '价格',
                isActive: false
            },
        ],

        //存放商品列表数据
        goods_list: []
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取分类商品点击后对应的商品列表
        this.queryParams.cid = options.cid || "";
        this.queryParams.query = options.query || "";
        this.getGoodsList();
    },

    getGoodsList() {
        request({
            url: '/goods/search',
            //获取接口中的数据
            data: this.queryParams
        }).then(res => {

            //获取总条数
            const total = res.data.message.total;
            //计算总页数 =(总条数/当前页面的容量数)
            this.totalPages = Math.ceil(total / this.queryParams.pagesize)

            //把获取的数据存进去
            this.setData({
                /*上拉页面加载：先把旧的数据解构出来，
                如果上拉还有数据，再把上拉的数据再解构出来*/
                goods_list: [...this.data.goods_list, ...res.data.message.goods]
            })

            //关闭下拉刷新的窗口
            wx.stopPullDownRefresh();
        })

    },

    //方法2：async同步处理
    // async getGoodsList() {
    //     const res = await request({
    //         url: '/goods/search',
    //         data: this.queryParams
    //     });
    //     this.setData({
    //         goods_list: res.data.message.goods
    //     })
    // },


    //自定义组件测点击事件监听
    handleTabItemChange(e) {
        //1 获取被选标题索引
        const {
            index
        } = e.detail;

        //2 获取data中isActive的值
        let {
            tabList
        } = this.data;

        //3 修改对应isActive的值;
        tabList.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);

        //4 重新赋值
        this.setData({
            tabList
        })

    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        //1. 重置数据
        this.setData({
            goods_list: []
        })
        //2. 设置页数为1
        this.queryParams.pagenum = 1;
        //3 重新发送请求
        this.getGoodsList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //当前的页数大于等于总的页数，没有下一页数据了
        if (this.queryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '商品已经到底部了',
            });
        } else {
            //如果有数据，页数+1，发送数据
            this.queryParams.pagenum++;
            this.getGoodsList();
        }
    },


})