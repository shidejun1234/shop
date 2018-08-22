var WxParse = require('../../wxParse/wxParse.js');
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
        isCollect: false,
        aaaa: "asdfasdfaf",
        isaddcar: true,
        isbuy: true,
        isab: true,
        isOne: true,
        goodsNum: 1
    },

    imageLoad: function(e) {
        var width = e.detail.width;
        var height = e.detail.height;
        this.setData({
            hig: 750 / (width / height)
        });
    },

    isCollect: function() {
        this.setData({
            isCollect: !this.data.isCollect
        });
        var title = "取消收藏";
        if (this.data.isCollect) {
            title = "收藏成功"
        }
        wx.showToast({
            title: title,
            icon: 'success',
            duration: 2000
        })
    },

    call: function() {
        wx.makePhoneCall({
            phoneNumber: '13242657732',
        });
    },

    car: function() {
        wx.switchTab({
            url: '../car/car',
        });
    },

    addCar: function() {
        this.setData({
            isaddcar: false,
            isab: false
        });
    },

    buy: function() {
        this.setData({
            isbuy: false,
            isab: false
        });
    },

    hiddenab: function() {
        this.setData({
            isaddcar: true,
            isbuy: true,
            isab: true
        });
        this.setData({
            goodsNum: 1,
            isOne: true
        });
    },

    goodsAdd: function() {
        this.setData({
            goodsNum: this.data.goodsNum + 1
        });
        if (this.data.goodsNum > 1) {
            this.setData({
                isOne: false
            });
        }
    },

    goodsReduce: function() {
        this.setData({
            goodsNum: this.data.goodsNum - 1
        });
        if (this.data.goodsNum < 2) {
            this.setData({
                isOne: true
            });
        }
    },

    doAddCar: function() {
        var that = this;
        var goodsData = {
            gId: that.data.goods.gId,
            gImage:that.data.goods.gImage,
            gName: that.data.goods.gName,
            gPrice: that.data.goods.gPrice,
            goodsNum: that.data.goodsNum,
            isOne: that.data.isOne
        }
        console.log(goodsData);
        var goodsCar = wx.getStorageSync('goodsCar');
        if (goodsCar) {
            var isGoodsData = true;
            for (var i = 0; i < goodsCar.length; i++) {
                if (goodsCar[i].gId == that.data.goods.gId) {
                    goodsCar[i].goodsNum += that.data.goodsNum;
                    isGoodsData = false;
                }
                if (goodsCar[i].goodsNum > 1) {
                    goodsCar[i].isOne=false;
                }
                if (goodsCar[i].goodsNum < 2) {
                    goodsCar[i].isOne = true;
                }
            }
            if (isGoodsData) {
                goodsCar.push(goodsData);
            }
            wx.setStorageSync('goodsCar', goodsCar);
        } else {
            wx.setStorageSync('goodsCar', [goodsData]);
        };
        for (var i = 0; i < goodsCar.length; i++) {
            if (goodsCar[i].gId == this.data.goods.gId) {
                this.setData({
                    carNum: goodsCar[i].goodsNum
                });
            }
        };
        wx.showToast({
            title: '添加购物车成功',
            icon: 'success',
            duration: 2000
        });
        that.hiddenab();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: 'http://120.77.251.239/shop/goodsdetails.php',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method:'GET',
            data:{
                gId: options.gId
            },
            success: function (res) {
                that.setData({
                    goods: res.data
                });
                var article = res.data.gDetails
                WxParse.wxParse('article', 'html', article, that, 5);
            }
        });
        var goodsCar = wx.getStorageSync('goodsCar');
        if (goodsCar) {
            for (var i = 0; i < goodsCar.length; i++) {
                if (goodsCar[i].gId == options.gId) {
                    this.setData({
                        carNum: goodsCar[i].goodsNum
                    });
                }
            }
        }
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