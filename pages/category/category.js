var app = getApp()
Page({
    data: {
        page: 1,
        curNav: 1,
        havgoods: false,
        isBottom: true,
        navList: [{
                id: 1,
                name: '盆栽'
            },
            {
                id: 2,
                name: '台灯'
            },
            {
                id: 3,
                name: '神器'
            },
            {
                id: 4,
                name: '杂货铺'
            },
            {
                id: 5,
                name: '雨伞'
            },
            {
                id: 6,
                name: '文具'
            },
            {
                id: 7,
                name: '袜子'
            },
            {
                id: 8,
                name: '沐浴'
            }
        ]
    },
    selectNav(event) {
        var that = this;
        var id = event.target.dataset.id;
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/651',
            data: {
                page: 0,
                cId: id
            },
            success: function(res) {
                var goodsList = [];
                if (res.data.data != "数据已全部加载") {
                    goodsList = res.data.data;
                    that.setData({
                        curNav: id,
                        goodsList: goodsList,
                        havgoods: true,
                        isBottom: true,
                        page: 1
                    })
                } else {
                    that.setData({
                        curNav: id,
                        goodsList: goodsList,
                        havgoods: false,
                        isBottom: true,
                        page: 1
                    })
                }
            }
        })
    },
    onLoad() {
        var that = this;
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/651',
            data: {
                page: 0,
                cId: 1
            },
            success: function(res) {
                var goodsList = [];
                if (res.data.data != "数据已全部加载") {
                    goodsList = res.data.data;
                    that.setData({
                        curNav: 1,
                        goodsList: goodsList,
                        havgoods: true
                    })
                } else {
                    that.setData({
                        curNav: 1,
                        goodsList: goodsList,
                        havgoods: false
                    })
                }
            }
        })
    },

    onReachBottom: function() {
        var that = this;
        if (that.data.isBottom) {
            wx.showLoading({
                title: '玩命加载中',
            })
            var page = that.data.page;
            var curNav = that.data.curNav;
            page = page * 10;
            wx.request({
                url: 'https://api.it120.cc/jimpdo/api/transmit/651',
                data: {
                    page: page,
                    cId: curNav
                },
                success: function(res) {
                    if (res.data.data != "数据已全部加载") {
                        var jsonarray = that.data.goodsList;
                        for (var i = 0; i < res.data.data.length; i++) {
                            jsonarray.push(res.data.data[i]);
                        }
                        that.setData({
                            goodsList: jsonarray
                        });
                        that.data.page += 1;
                    } else {
                        that.setData({
                            isBottom: false
                        });
                    }
                    wx.hideLoading();
                }
            })
        }
    }

})