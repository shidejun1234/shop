// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: ['../../images/hot_01.jpg', '../../images/hot_02.jpg', '../../images/hot_04.jpg', '../../images/hot_02.jpg'],
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        category: [{
            'image': '../../images/qiandao.png',
            'category': '签到'
        }, {
            'image': '../../images/youhuiquan.png',
            'category': '优惠券'
        }, {
            'image': '../../images/penzai.png',
            'category': '盆栽'
        }, {
            'image': '../../images/taideng.png',
            'category': '台灯'
        }, {
            'image': '../../images/shenqi.png',
            'category': '神器'
        }, {
            'image': '../../images/zahuopu.png',
            'category': '杂货铺'
        }, {
            'image': '../../images/yusan.png',
            'category': '雨伞'
        }, {
            'image': '../../images/wenju.png',
            'category': '文具'
        }, {
            'image': '../../images/wazi.png',
            'category': '袜子'
        }, {
            'image': '../../images/muyu.png',
            'category': '沐浴'
        }],
        brand: [{
            'image': '../../images/hot_01.jpg'
        }, {
            'image': '../../images/hot_04.jpg'
        }, {
            'image': '../../images/hot_01.jpg'
        }, {
            'image': '../../images/hot_04.jpg'
        }, {
            'image': '../../images/hot_01.jpg'
        }],
        scroll: [{
            'image': '../../images/hot_01.jpg'
        }, {
            'image': '../../images/hot_04.jpg'
        }, {
            'image': '../../images/hot_01.jpg'
        }, {
            'image': '../../images/hot_04.jpg'
        }, {
            'image': '../../images/hot_01.jpg'
        }]
    },

    imageLoad: function(e) {
        var width = e.detail.width;
        var height = e.detail.height;
        this.setData({
            hig: 750 / (width / height)
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that=this;
        wx.request({
            url: 'http://localhost/shop/showgoods.php',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success:function(res){
                that.setData({
                    goods:res.data
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})