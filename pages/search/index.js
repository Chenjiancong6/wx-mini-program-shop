import {
    request
} from '../../request/request.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //搜索框获取的数据
        goods: [],
        //取消按钮是否显示
        isFocus: false,
        //输入框的值
        inpValue: "",
        goods_list: []
    },
    //防抖函数初值
    timeId: -1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取分类商品点击后对应的商品列表
        // this.queryParams.cid = options.cid;
        this.getGoodsList();
    },


    /**
     * 输入框的值改变，触发点击事件
     */
    handleInput(e) {
        //1 获取输入框的值
        const {
            value
        } = e.detail;

        //2 检测输入值合法性
        if (!value.trim()) {
            //当值不合法或者为空时，清空搜索数据
            this.setData({
                goods: [],
                isFocus: false
            })
            return;
        }

        //设置防抖函数
        clearInterval(this.timeId);
        this.timeId = setTimeout(() => {
            //3 接收从后端传过来的数据
            this.inputSearch(value);
        }, 1000)

        //4 当输入框有值，取消按钮隐藏
        this.setData({
            isFocus: true
        })

    },

    /**
     * 发送数据请求函数
     */
    inputSearch(query) {
        request({
            url: '/goods/qsearch',
            data: {
                query
            }
        }).then(res => {
            //把获取的数据保存到数组中
            this.setData({
                goods: res.data.message
            })
        })
    },

    /**
     * 点击取消按钮，清空显示数据
     */
    handleCancel() {
        this.setData({
            inpValue: "",
            goods: [],
            isFocus: false
        })
    },

    /**
     * 推荐的商品数据
     */
    getGoodsList() {
        request({
            url: '/goods/search',
            //获取接口中的数据
            data: this.cid = 930
        }).then(res => {
            //把获取的数据存进去
            this.setData({
                /*上拉页面加载：先把旧的数据解构出来，
                如果上拉还有数据，再把上拉的数据再解构出来*/
                goods_list: [...res.data.message.goods]
            })
        })
    },

})