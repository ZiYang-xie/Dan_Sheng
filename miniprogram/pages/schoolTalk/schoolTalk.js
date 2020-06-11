const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentSubPage: "recommend",
    currentTalks: [
      {
        talkName: "在绩点方面无敌是怎样一种感觉？",
        talkIntroduction: "来评论我",
        talkId: 212,
        talkPublisher: "吕昌泽",
      },
    ]
  },

  handleChangeScroll({detail}) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage
    });
    var that = this;
    wx.request({
      //将当前页面的主题发给后端
      url: app.globalData.baseUrl + '/schoolTalk_view',
      data: {
        userOpenId: app.globalData.openId,
        currentSubPage:currentSubPage,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalks: res.data.currentTalks
        });
      }
    });
  },

  gotoDetail: function (e) {
    app.globalData.currentDetailTalk = e.currentTarget.dataset.talk_id;
    wx.navigateTo({
      url: 'talkDetail/talkDetail',
    })
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current: 'schoolTalk'
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/schoolTalk_view',
      data: {
        userOpenId: app.globalData.openId,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalks: res.data.currentTalks,
        })
      }
    });
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