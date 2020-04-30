// miniprogram/pages/releaseTalk/releaseTalk.js
  const { $Message } = require('../../../dist/base/index');
  const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talkName:'',
    talkIntroduction:'',
  },

  formSubmit: function (e) {
    var talkName = e.detail.value.talkName;
    var talkIntroduction = e.detail.value.talkIntroduction;
    wx.request({
      //将搜索内容发给后端
      url: '/releaseTalk_submit',
      data: {
        talkPublisher: app.globalData.userName,
        talkName:talkName,
        talkIntroduction:talkIntroduction,
      },
      success(res) {
        $Message({
          content: '发布成功',
          type: 'success'
      });
      },
      // fail(res) {
      //   $Message({
      //     content: '发布失败，请检查网络！',
      //     type: 'error'
      // });
      // }
    });
    console.log('form发生了submit事件，携带数据为：',talkName)
    console.log('form发生了submit事件，携带数据为：',talkIntroduction)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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