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
      talkPublisher: "吕昌泽",
    },
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

  jumpToPublishTalkAnswer(){
    wx.navigateTo({
      url: 'publishTalkAnswer/publishTalkAnswer',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentTalkId : app.globalData.currentDetailTalk
    })
    console.log(this.data.currentTalkId)
    var that = this;
    wx.request({
      url:app.globalData.baseUrl+'/talkDetail_onShow',
      data: {
        currentTalkId:that.data.currentTalkId,
        talkAnswers:that.data.talkAnswers,
      },
      method:"POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalkInformation : res.data.data.currentTalkInformation,
          talkAnswers:res.data.data.talkAnswers,
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