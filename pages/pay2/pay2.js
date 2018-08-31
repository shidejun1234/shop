Page({
    onLoad: function (options) {
        this.setData({
            total:options.total
        })
    },
    requestPayment: function () {
        var that = this;
        that.setData({
            loading: true
        })
    }
})
