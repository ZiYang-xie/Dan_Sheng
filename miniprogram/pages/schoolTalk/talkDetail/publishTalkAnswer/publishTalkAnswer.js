// miniprogram/pages/schoolTalk/talkDetail/publishTalkAnswer/publishTalkAnswer.js
const app = getApp();
const {$Message} = require('../../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data:{
    userOpenId:app.globalData.openId,
    currentTalkId:app.globalData.currentDetailTalk,
    currentTalkName:app.globalData.currentDetailTalkName,
    myAnswer:"",
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
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/api/publishTalkAnswer_addAnswer',
      data: {
        userOpenId: that.data.userOpenId,
        userName:app.globalData.userInfo.nickName,
        currentTalkId:app.globalData.currentDetailTalk,
        answerContent: that.data.myAnswer,
      },
      method:"POST",
      success(res) {
        $Message({
          content: '发表成功',
          type: 'success'
        });
        wx.navigateBack(1)
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userOpenId:app.globalData.openId,
      currentTalkId:app.globalData.currentDetailTalk,
      currentTalkName:app.globalData.currentDetailTalkName,
    })
    console.log(app.globalData.userInfo)
    console.log(app.globalData.userInfo.nickName)
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