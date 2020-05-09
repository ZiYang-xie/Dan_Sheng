const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentSubPage: "recommend",
    currentTalks: [{
      talkName: "hhh",
      talkIntroduction: "无敌",
      talkId: "212",
      talkPublisher: "吕昌泽",
    }, ]
  },

  handleChangeScroll({
    detail
  }) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage
    });
    console.log(currentSubPage);
    wx.request({
      //将当前页面的主题发给后端
      url: '/schoolTalk_changeSubPage',
      data: {
        currentSubPage: currentSubPage,
        userName: app.globalData.userName, //全局变量
      },
      success(res) {
        //得到返回的数据
        this.setData({
          currentTalks: res.data.currentTalks
        });
        console.log(res.data)
      }
    });
  },

  gotoDetail: function (e) {
    app.globalData.currentDetailTalk = e.currentTarget.dataset.talk_id;
    console.log(app.globalData.currentDetailTalk + " 1");
    wx.navigateTo({
      url: 'talkDetail/talkDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      //默认页面是推荐，所以进入时应该获得推荐的数据
      url: '/schoolTalk_recommend',
      data: {
        //发送给后端当前用户的名称
        userName: app.globalData.userName,
      },
      success(res) {
        //得到返回的数据，根据用户的标签进行商品推荐
        this.setData({
          currentTalks: res.data.currentTalks,
        })
        console.log(res.data)
      }
    });
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current: 'schoolTalk'
      })
    }
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