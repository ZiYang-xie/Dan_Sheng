// miniprogram/pages/mine/credit/credit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:app.globalData.userName,
    creditValue:100,
    creditImg: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:app.globalData.userName,
    })
    wx.request({
      url: 'mineCredit_onLoad',
      data:{
        userName:app.globalData.userName,
      },
      success(res) {
        this.setData({
          creditValue : res.data.creditValue,
        })
      }
    })
    if(this.creditValue < 60){
      this.setData({
        creditImg:"./creditImg/BadCredit.png"
      })
    } 
    else if(this.creditValue >=60 && this.creditValue <90){
      this.setData({
        creditImg:"./creditImg/GoodCredit.png"
      })
    }
    else{
      this.setData({
        creditImg:"./creditImg/ExcellentCredit.png"
      })
    }
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