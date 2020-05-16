// miniprogram/pages/mine/subscription/subscription.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:app.globalData.userName,
    subseriptions:["小红书","闲鱼","微信"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:app.globalData.userName,
    })
    wx.request({
      url: 'mineSubscription_onLoad',
      data:{
        userName:app.globalData.userName,
      },
      success(res) {
        this.setData({
          subseriptions : res.data.subseriptions,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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