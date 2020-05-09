// miniprogram/pages/schoolTalk/talkDetail/talkDetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTalkId: app.globalData.currentDetailTalk,
    currentTalkInformation: {
      talkName: "如何看待复旦大学的网课制度？",
      talkInformation:"ewiudsapodjoqwepafspwqjopqweqw",
      talkPublisher: "吕昌泽",
      talkAnswers:[
        {
          answerPublisher:"杨朝晖",
          answerContent:"我觉得还行，毕竟像我这样的大佬随便A",
        },
        {
          answerPublisher:"吕昌泽",
          answerContent:"我觉得不行，像我这样的菜鸡都是C",
        },
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTalkId : app.globalData.currentDetailTalk
    })
    console.log(this.data.currentTalkId)
    wx.request({
      //将当前页面的讨论Id发给后端
      url: '/talkDetail_onLoad',
      data: {
        currentTalkId:this.data.currentTalkId,
      },
      success(res) {
        //得到返回的数据
        this.setData({
          currentTalkInformation : res.data.currentTalkInformation
        })
        console.log(res.data)
      }
    });
  },


  jumpToPublishTalkAnswer(){
    wx.navigateTo({
      url: 'publishTalkAnswer/publishTalkAnswer',
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