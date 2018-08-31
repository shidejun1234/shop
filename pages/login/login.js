// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onGotUserInfo: function (e) {
        var that = this;
        wx.login({
            success: function (res) {
                //发起网络请求
                wx.request({
                    url: 'https://api.it120.cc/jimpdo/api/transmit/652',
                    data: {
                        js_code: res.code
                    },
                    success: function (res) {
                        console.log(res);
                        that.setData({
                            openid: res.data.data.openid
                        });
                    }
                });
            }
        });
        if (e.detail.userInfo) {
            wx.setStorageSync('userInfo', e.detail.userInfo);
            wx.switchTab({
                url: '../../pages/index/index',
            })
        }
        console.log(e)
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