// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0
    },

    goodsAdd(e) {
        var id = e.currentTarget.dataset.id;
        var num = e.currentTarget.dataset.num;
        var total = this.data.total;
        var goodsCar = wx.getStorageSync('goodsCar');
        goodsCar[id].goodsNum += 1;
        if (goodsCar[id].goodsNum > 1) {
            goodsCar[id].isOne = false;
        }
        wx.setStorageSync('goodsCar', goodsCar);
        this.setData({
            goodsCar: goodsCar
        });
        if (goodsCar[id].isCheck == true) {
            total += Number(goodsCar[id].gPrice);
            this.setData({
                total: total
            });
        }
    },

    goodsReduce(e) {
        var id = e.currentTarget.dataset.id;
        var num = e.currentTarget.dataset.num;
        var total = this.data.total;
        var goodsCar = wx.getStorageSync('goodsCar');
        goodsCar[id].goodsNum -= 1;
        if (goodsCar[id].goodsNum < 2) {
            goodsCar[id].isOne = true;
        }
        wx.setStorageSync('goodsCar', goodsCar);
        this.setData({
            goodsCar: goodsCar
        });
        if (goodsCar[id].isCheck == true) {
            total -= Number(goodsCar[id].gPrice);
            this.setData({
                total: total
            });
        }
    },

    formSubmit: function(e) {
        console.log(e);
    },

    checkAll: function() {
        var goodsCar = wx.getStorageSync('goodsCar');
        var checkAll = wx.getStorageSync('checkAll');
        var total = 0;
        for (var i = 0; i < goodsCar.length; i++) {
            if (goodsCar[i].isCheck == false) {
                checkAll = false;
            }
        }
        if (checkAll) {
            for (var i = 0; i < goodsCar.length; i++) {
                if (goodsCar[i].isCheck == true) {
                    goodsCar[i].isCheck = false;
                }
            }
            checkAll = false;
        } else {
            for (var i = 0; i < goodsCar.length; i++) {
                if (goodsCar[i].isCheck == false) {
                    goodsCar[i].isCheck = true;
                }
                total += Number(goodsCar[i].gPrice) * Number(goodsCar[i].goodsNum);
            }
            checkAll = true;
        }
        wx.setStorageSync('goodsCar', goodsCar);
        wx.setStorageSync('checkAll', checkAll);
        this.setData({
            goodsCar: goodsCar,
            checkAll:checkAll,
            total:total
        })
    },

    aaa: function(e) {
        var goodsCar = wx.getStorageSync('goodsCar');
        var checkAll = wx.getStorageSync('checkAll');
        var total = 0;
        var gIdArr = [];
        for (var i = 0; i < e.detail.value.length; i++) {
            var arr = e.detail.value[i].split("&&");
            total += Number(arr[1]) * Number(arr[2]);
            gIdArr.push(arr[0]);
        }
        for (var i = 0; i < goodsCar.length; i++) {
            if (gIdArr.indexOf(goodsCar[i].gId) == -1) {
                goodsCar[i].isCheck = false;
                checkAll=false;
            } else {
                goodsCar[i].isCheck = true;
            }
        }
        wx.setStorageSync('goodsCar', goodsCar);
        wx.setStorageSync('checkAll', checkAll);
        this.setData({
            total: total,
            checkAll:checkAll
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
        var goodsCar = wx.getStorageSync('goodsCar');
        var checkAll = wx.getStorageSync('checkAll');
        var total = 0;
        if (goodsCar != "") {
            this.setData({
                goodsCar: goodsCar,
                hasCar: true,
                checkAll: checkAll
            });
        }
        for (var i = 0; i < goodsCar.length; i++) {
            if (goodsCar[i].isCheck == true) {
                total += Number(goodsCar[i].gPrice) * Number(goodsCar[i].goodsNum);
            }
        }
        this.setData({
            total: total
        })
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