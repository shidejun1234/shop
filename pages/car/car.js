// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    goodsAdd(e) {
        var id = e.currentTarget.dataset.id;
        var num = e.currentTarget.dataset.num;
        var goodsCar = wx.getStorageSync('goodsCar');
        goodsCar[id].goodsNum+=1;
        if (goodsCar[id].goodsNum > 1) {
            goodsCar[id].isOne=false;
        }
        wx.setStorageSync('goodsCar', goodsCar);
        this.setData({
            goodsCar:goodsCar
        });
    },

    goodsReduce(e) {
        var id = e.currentTarget.dataset.id;
        var num = e.currentTarget.dataset.num;
        var goodsCar = wx.getStorageSync('goodsCar');
        goodsCar[id].goodsNum -= 1;
        if (goodsCar[id].goodsNum < 2) {
            goodsCar[id].isOne = true;
        }
        wx.setStorageSync('goodsCar', goodsCar);
        this.setData({
            goodsCar: goodsCar
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
        console.log(goodsCar);
        if(goodsCar!=""){
            this.setData({
                goodsCar: goodsCar,
                hasCar: true
            });
        }        
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