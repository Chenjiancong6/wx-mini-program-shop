// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //收货地址数据
        address: {},
        //购物车的数据
        cart: [],
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //获取收货地址的缓存数据
        const address = wx.getStorageSync("address");

        /**
         * 从商品 详情页面 获取商品的缓存数据，不需要使用像vuex的状态管理工具！！
         */
        const cart = wx.getStorageSync("cart") || [];

        //给data赋值存储
        this.setData({
            address,
        });

        /**
         * 价格和数量封装函数
         */
        this.setCart(cart);
    },


    /**
     * 价格,全选 封装函数
     */
    setCart(cart) {
        //1. 设置总价格和总数量的变量
        let totalPrice = 0;
        let totalNum = 0;

        //2. 过滤选中的购物车数据，把选中的放到支付页面
        cart = cart.filter(v => v.checked);

        //3. 遍历每一个商品
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        });

        //5. 重新存入数据
        this.setData({
            cart,
            totalPrice,
            totalNum,
        });
    },

})