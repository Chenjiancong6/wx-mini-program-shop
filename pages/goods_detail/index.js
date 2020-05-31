// pages/goods_detail/index.js

import {
    request
} from '../../request/request.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //存放商品详情的数组
        goodsDetail: []
    },

    //存放请求后返回的数据，用于展示预览图片和购物车数据
    goodsInfo: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const goods_id = options;
        this.getGoodsDetail(goods_id)
    },

    //获取商品详情数据
    getGoodsDetail(goods_id) {
        request({
            url: '/goods/detail',
            data: goods_id,
        }).then(res => {
            //预览图片
            this.goodsInfo = res.data.message;

            this.setData({
                goodsDetail: {
                    pics: res.data.message.pics,
                    goods_price: res.data.message.goods_price,
                    goods_name: res.data.message.goods_name,
                    goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg')
                }
            })
        })
    },

    //加入购物车点击事件
    handleCartAdd(e) {
        //1.获取缓存的购物车数据
        const cart = wx.getStorageSync('cart') || [];
        //2 判断当前的点击的商品是否已经存在购物车数组中
        let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);

        if (index === -1) {
            //没有存在数组中，第一次添加
            this.goodsInfo.num = 1;

            //商品在购物车选中时转态
            this.goodsInfo.checked = true;
            //把商品加入到购物车
            cart.push(this.goodsInfo)
        } else {
            //已经在购物车添加过了
            cart[index].num++;
        }
        //把购物车添加到缓存数据中
        wx.setStorageSync("cart", cart);

        //设置弹窗
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true,
        });
    },

    //点击放大全屏预览图片
    handlePreviewImage(e) {
        //构造预览图片的数组
        const urls = this.goodsInfo.pics.map(v => v.pics_big);
        //接收当前图片链接
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current, // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
        });

    },


})