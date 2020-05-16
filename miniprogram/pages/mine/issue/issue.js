// miniprogram/pages/mine/issue/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: "good",
  },

  changeTab({
    detail
  }) {
    var currentTab = detail.key;
    this.setData({
      currentTab: currentTab,
    });
    wx.request({
      //将当前页面是推荐还是热榜发给后端
      url: '/mineIssue_changeTab',
      data: {
        currentTab: currentTab,
        userName: app.globalData.userName, //全局变量
      },
      success(res) {
        //得到返回的数据
        this.setData({
          issuedGoods: res.data.issuedGoods
        })
        console.log(res.data)
      }
    });
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