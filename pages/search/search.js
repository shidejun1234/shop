// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 2,
        hasgoods: true,
        isBottom:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that=this;
        wx.showLoading({
            title: '玩命加载中',
        })
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/646',
            data:{
                key: options.key,
                page:0
            },
            success:function(res){
                if (res.data.data =="sorry,找不到该宝贝"){
                    that.setData({
                        hasgoods: false
                    });
                } else {
                    that.setData({
                        hasgoods: true,
                        goods: res.data.data,
                        key: options.key
                    });
                }
                wx.hideLoading();
            }
        })
    },

    search: function (e) {
        var that=this;
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/646',
            data: {
                key: e.detail.value.key,
                page: 0
            },
            success: function (res) {
                if (res.data.data == "sorry,找不到该宝贝") {
                    that.setData({
                        hasgoods: false
                    });
                } else {
                    that.setData({
                        hasgoods: true,
                        goods: res.data.data,
                        key: e.detail.value.key
                    });
                }
                wx.hideLoading();
            }
        })
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
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading();
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/646',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                page: 0,
                key:that.data.key
            },
            success: function (res) {
                that.setData({
                    goods: res.data.data,
                    page: 2,
                    isBottom: true
                });
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            }
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this;
        if (that.data.isBottom == true) {
            wx.showLoading({
                title: '玩命加载中',
            })
            var page = that.data.page;
            page = (page - 1) * 10;
            wx.request({
                url: 'https://api.it120.cc/jimpdo/api/transmit/646',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    page: page,
                    key:that.data.key
                },
                success: function (res) {
                    if (res.data.data == '数据已全部加载') {
                        that.setData({
                            isBottom: false
                        });
                    } else {
                        // var jsonstr = JSON.stringify(res.data);
                        // jsonstr = jsonstr.substring(1, jsonstr.length - 1);
                        // var goods = that.data.goods;
                        // var goodsstr = JSON.stringify(goods);
                        // goodsstr = goodsstr.substring(1, goodsstr.length - 1);
                        // if (goodsstr == "") {
                        //     jsonstr = '[' + jsonstr + ']';
                        // } else {
                        //     jsonstr = '[' + goodsstr + ',' + jsonstr + ']';
                        // }
                        // var jsonarray = JSON.parse(jsonstr);
                        var jsonarray = that.data.goods;
                        for (var i = 0; i < res.data.data.length; i++) {
                            jsonarray.push(res.data.data[i]);
                        }
                        that.setData({
                            goods: jsonarray
                        })
                        that.data.page += 1;
                    }
                    wx.hideLoading();
                }
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})