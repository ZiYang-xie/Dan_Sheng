// miniprogram/pages/schoolTalk/talkDetail/publishTalkAnswer/publishTalkAnswer.js
const app = getApp();
const {$Message} = require('../../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data:{
    userName:app.globalData.userName,
    currentTalkId:app.globalData.currentDetailTalk,
    currentTalkInformation:{
      talkName:"如何看待复旦大学的网课制度？",
      talkPublisher:"吕昌泽"
    },
    myAnswer:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:app.globalData.userName,
      currentTalkId:app.globalData.currentDetailTalk,
    })
    wx.request({
      url: 'publishTalkAnswer_onLoad',
      data:{
        currentTalkId:this.data.currentTalkId
      },
      success(res) {
        //得到返回的数据
        this.setData({
          currentTalkInformation : res.data.currentTalkInformation
        })
        console.log(res.data)
      }
    })
  },

  inputAnswer(e) {
    console.log(e.detail.value);
    this.setData({
      myAnswer: e.detail.value,
    })
  },

  publishTalkAnswer() {
    const blank = /^[ ]+$/;
    if(blank.test(this.data.myAnswer) || this.data.myAnswer===''){
      $Message({
        content: '回答不得为空',
        type: 'error'
      });
      return;
    }
    wx.request({
      url: 'publishTalkAnswer_addAnswer',
      data: {
        answerPublisher: app.globalData.userName,
        answerContent: this.data.myAnswer,
      },
      success(res) {
        $Message({
          content: '发表成功',
          type: 'success'
        });
        // wx.navigateBack({
        //   url: '../talkDetail'
        // })
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