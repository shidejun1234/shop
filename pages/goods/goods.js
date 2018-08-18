// pages/goods/goods.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: ['../../images/hot_01.jpg', '../../images/hot_02.jpg', '../../images/hot_04.jpg', '../../images/hot_02.jpg'],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        goods: [{
            'id': '1',
            'goodsName': 'asdasd',
            'price': '666',
            'oldPrice': '999',
            'inventory':'45',
            'sales':'55'
        }],
        aaaa:"asdfasdfaf"
    },

    imageLoad: function(e) {
        var width = e.detail.width;
        var height = e.detail.height;
        console.log(750 / (width / height));
        this.setData({
            hig: 750 / (width / height)
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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