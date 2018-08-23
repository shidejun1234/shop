// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        isBottom: true,
        background: ['../../images/hot_01.jpg', '../../images/hot_02.jpg', '../../images/hot_04.jpg', '../../images/hot_02.jpg'],
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular:true,
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
        }],
        goods: [],
        aa: []
    },

    imageLoad: function(e) {
        var width = e.detail.width;
        var height = e.detail.height;
        this.setData({
            hig: 750 / (width / height)
        });
    },

    sao:function(){
        wx.scanCode({
            success: function(res){
                console.log(res);
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

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
        wx.showNavigationBarLoading();
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/643',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                page: 0
            },
            success: function(res) {
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
    onReachBottom: function() {
        var that = this;
        if (that.data.isBottom == true) {
            wx.showLoading({
                title: '玩命加载中',
            })
            var page = that.data.page;
            page = (page - 1) * 10;
            wx.request({
                url: 'https://api.it120.cc/jimpdo/api/transmit/643',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    page: page
                },
                success: function(res) {
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
                        var jsonarray=that.data.goods;
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
    onShareAppMessage: function () {
        return {
            title: '微信商城',
            desc: '微信商城',
            path: '/pages/index/index'
        }
    },
})