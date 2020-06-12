// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList: [{
                id: 0,
                value: '体验问题',
                isActive: true
            },
            {
                id: 1,
                value: '商品/商家投诉',
                isActive: false
            },
        ],
        //上传图片的数组
        chooseImg: [],
        //内容输入框
        textValue: ''
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

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
     * 点击上传图片
     */
    handleChooseImg() {
        //从本地相册或者照相机选择图片
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                this.setData({
                    //对图片数组进行拼接
                    chooseImg: [...this.data.chooseImg, ...result.tempFilePaths]
                })
            },
        });

    },

    /**
     * 点击删除上传的图片
     */
    handleRemoveImg(e) {
        //1 获取当前的值
        const {
            index
        } = e.currentTarget.dataset;
        //2.获取data中的数据
        const {
            chooseImg
        } = this.data;
        //3 删除已经上传的图片
        chooseImg.splice(index, 1)
        //4.删除操作后，重新保存到data中
        this.setData({
            chooseImg
        })
    },

    /**
     * 获取和判断内容输入框
     */
    handleTextArea(e) {
        //获取输入框的值
        this.setData({
            textValue: e.detail.value
        })
    },

    /**
     * 点击提交按钮
     */
    handleBtn() {

        //获取文本域的内容
        const {
            textValue
        } = this.data;

        //判断当文本域或有上传图片，才能显示提交
        if (this.data.chooseImg.length !== 0 || textValue.trim()) {
            wx.showToast({
                title: '提交成功！',
                icon: 'success',
                mask: true,
            });

            // 清空所有数据
            this.setData({
                textValue: '',
                chooseImg: []
            });

            //跳转回到原来的页面
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1
                })
            }, 1000)

        } else {
            wx.showToast({
                title: '请输入正确的值！',
                icon: 'none',
                mask: true,
            });
        }
    }
})