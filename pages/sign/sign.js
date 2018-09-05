// pages/sign/sign.js
//获取应用实例
var calendarSignData;
var date;
var calendarSignDay;
var url = "url"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //事件处理函数
    calendarSign: function() {

        calendarSignData[date] = date;
        console.log(calendarSignData);
        calendarSignDay = calendarSignDay + 1;
        wx.setStorageSync("calendarSignData", calendarSignData);
        wx.setStorageSync("calendarSignDay", calendarSignDay);

        wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 2000
        })
        //用户积分增加
        var openid = wx.getStorageSync('openid');
        wx.request({
            url: url + 'Wx_AddScore',
            data: {
                openid: openid
            },
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
                console.log(res)
            }
        })

        this.setData({
            calendarSignData: calendarSignData,
            calendarSignDay: calendarSignDay
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;

        //日历加载
        var mydate = new Date();
        var year = mydate.getFullYear();
        var month = mydate.getMonth() + 1;
        date = mydate.getDate();
        console.log("date" + date)
        var day = mydate.getDay();
        console.log(day)
        var nbsp;
        if ((date - day) <= 0) {
            nbsp = day - date + 1;
            console.log(111111)
        } else {
            console.log(33333333)
            nbsp = 7 - ((date - day) % 7) + 1;
        }
        console.log("nbsp" + nbsp);
        var monthDaySize;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            monthDaySize = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            monthDaySize = 30;
        } else if (month == 2) {
            // 计算是否是闰年,如果是二月份则是29天
            if ((year - 2000) % 4 == 0) {
                monthDaySize = 29;
            } else {
                monthDaySize = 28;
            }
        };
        // 判断是否签到过
        if (wx.getStorageSync("calendarSignData") == null || wx.getStorageSync("calendarSignData") == '') {
            wx.setStorageSync("calendarSignData", new Array(monthDaySize));
        };
        if (wx.getStorageSync("calendarSignDay") == null || wx.getStorageSync("calendarSignDay") == '') {
            wx.setStorageSync("calendarSignDay", 0);
        }
        calendarSignData = wx.getStorageSync("calendarSignData")
        calendarSignDay = wx.getStorageSync("calendarSignDay")
        console.log(calendarSignData);
        console.log(calendarSignDay)
        that.setData({
            year: year,
            month: month,
            nbsp: nbsp,
            monthDaySize: monthDaySize,
            date: date,
            calendarSignData: calendarSignData,
            calendarSignDay: calendarSignDay
        })
        //获取用户积分
        var openid = wx.getStorageSync('openid');
        wx.request({
            url: url + 'Wx_GetStuScore',
            data: {
                openid: openid
            },
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
                that.setData({
                    score: res.data
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