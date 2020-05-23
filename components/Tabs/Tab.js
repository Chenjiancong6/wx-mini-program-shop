// components/Tabs/Tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabList: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //文字点击事件
        handleTabItem(e) {
            //获取检索
            const {
                index
            } = e.currentTarget.dataset;
            //把点击事件传递给父组件
            this.triggerEvent('tabItemChange', {
                index
            })
        }
    }
})