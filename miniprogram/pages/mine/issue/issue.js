// miniprogram/pages/mine/issue/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: "good",
    currentGoods: [{
      goodName: "文具-笔",
      goodPrice: 5,
      goodReleaseTime: "2020/3/20",
      goodSeller:"谢子飏",
      goodIntroduction: "几支笔",
      goodId: 1,
      goodImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587917214759&di=7f9b2d53641e3b67ba3f73ef86465dd1&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777322e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69322f543174526f355866426758585858585858585f2121302d6974656d5f7069632e6a7067.jpg",
    }
    ]
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