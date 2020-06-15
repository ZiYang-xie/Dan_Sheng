// miniprogram/pages/mine/subscription/subscription.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySubscriptions: ["1", "2", "3"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/mine_subscription_onShow',
      data: {
        userOpenId: app.globalData.openId,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          mySubscriptions: res.data.data.mySubscriptions,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})