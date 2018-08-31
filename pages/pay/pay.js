// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ispay:true
    },

    toPay:function(){
        this.setData({
            ispay:false
        });
        // wx.navigateTo({
        //     url: '../pay2/pay2?total='+this.data.total,
        // })
    },

    bb:function(){
        this.setData({
            ispay: true
        });
    },

    requestPayment: function () {
        var that = this;
        that.setData({
            loading: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that=this;
        var goodsid = options.goodsid;
        var goodsnum = options.goodsnum.split(",");
        var goodsnum2 = [];
        var goods=[];
        for (var i = 0; i < goodsnum.length; i++) {
            goodsnum2.push([goodsnum[i].split("$$")[0], goodsnum[i].split("$$")[1], goodsnum[i].split("$$")[2]]);
        }
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/654',
            method:"POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:{
                goodsid:goodsid
            },
            success:function(res){
                for(var i=0;i<res.data.data.length;i++){
                    for (var j = 0; j < goodsnum2.length;j++){
                        if (res.data.data[i].gId == goodsnum2[j][0]){
                            res.data.data[i].gNum=goodsnum2[j][2];
                        }
                    }
                }
                that.setData({
                    goods:res.data.data,
                    total:options.total
                })
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