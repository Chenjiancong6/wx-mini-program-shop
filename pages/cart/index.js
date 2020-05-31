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
        //全选按钮
        allChecked: false
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

    //收货地址按钮点击事件
    handleAddressBtn(e) {
        //获取当前用户设置
        wx.getSetting({
            success: (result) => {
                //获取用户权限状态
                const scope_address = result.authSetting["scope.address"];

                //1.如果已经授予过权限或者还没进行过操作
                if (scope_address === true || scope_address === undefined) {
                    wx.chooseAddress({
                        success: (result1) => {
                            //获取缓存数据
                            wx.setStorageSync('address', result1);
                        },
                    });
                } else {
                    //2. 如果用户之前拒绝过授权，则诱导用户打开授权
                    wx.openSetting({
                        success: (result2) => {
                            wx.chooseAddress({
                                success: (result3) => {
                                    //获取缓存数据
                                    wx.setStorageSync('address', result3);
                                },
                            });
                        },
                    });
                }
            },
        });
    },

    /**
     * 价格,全选 封装函数
     */
    setCart(cart) {
        //1. 设置总价格和总数量的变量
        let totalPrice = 0;
        let totalNum = 0;
        //2. 全选默认为true
        let allChecked = true;
        //3. 遍历每一个商品
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;
            } else {
                //当有一个没选中，全选为false
                allChecked = false;
            }
        });
        //4. 判断数组是否为空
        allChecked = cart.length != 0 ? allChecked : false;
        //5. 重新存入数据
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        });
        //6. 重新设置缓存
        wx.setStorageSync("cart", cart);
    },

    /**
     * 商品点击选中
     */
    handleItemChange(e) {
        //1.获取修改商品的id
        const goods_id = e.currentTarget.dataset.id;
        //2. 获取购物车数组
        let {
            cart
        } = this.data;
        //3.找到修改的对象
        let index = cart.findIndex(v => v.goods_id === goods_id);
        //4.选中状态取反
        cart[index].checked = !cart[index].checked;

        //5. 改变价格和数量
        this.setCart(cart);
    },

    /**
     * 商品全选与反选
     */
    handleAllChecked(e) {
        //1.获取data的值
        let {
            cart,
            allChecked
        } = this.data;
        //2. 全选取反
        allChecked = !allChecked;
        //3.让商品的选中状态随全选改变
        cart.forEach(v => v.checked = allChecked);
        //4.调用封装好的价格 数量函数
        this.setCart(cart)
    },

    /**
     * 商品的数量
     */
    handleItemNum(e) {
        //1.获取传递过来的参数
        const {
            operation,
            id
        } = e.currentTarget.dataset;
        //2.获取data中的数据
        let {
            cart
        } = this.data;
        // 3. 找到修改商品的索引
        let index = cart.findIndex(v => v.goods_id === id);
        //6.当num商品数量为0时，判断是否删除商品
        if (cart[index].num === 1 && operation === -1) {
            //设置弹窗提示
            wx.showModal({
                title: '哈克提示您',
                content: '是否要删除该商品呀？',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#d81e06',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        //删除语句
                        cart.splice(index, 1);
                        //重新设置缓存数据
                        this.setCart(cart)
                    } else if (result.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });

        } else {
            //4.修改商品数量num
            cart[index].num += operation;
            //5. 设置回data和缓存中
            this.setCart(cart);
        }
    },

    /**
     * 结算支付按钮
     */
    handlePay(e) {
        //1. 获取data中的数据
        const {
            address,
            totalNum
        } = this.data;
        //2.判断用户有没有选择收货地址
        if (!address.userName) {
            wx.showToast({
                title: '您还没有填写收货地址',
                icon: 'none',
                mask: true,
            });
            return;
        }
        //3. 判断用户有没有选购商品
        if (totalNum === 0) {
            wx.showToast({
                title: '您还没有选购商品喔',
                icon: 'none',
                mask: true,
            });
            return;
        }
        //4.跳转到支付页面
        wx.navigateTo({
            url: '/pages/pay/index',
        });

    }
})