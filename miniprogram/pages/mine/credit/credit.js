// miniprogram/pages/mine/credit/credit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    creditValue:100,
    creditImg: "",
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
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/mine_credit_onShow',
      data:{
        userOpenId:app.globalData.openId,
      },
      method:"POST",
      success(res){
        that.setData({
          creditValue:res.data.data.creditValue,
        })
      }
    })
   
    if(that.data.creditValue < 60){
      that.setData({
        creditImg:"./creditImg/BadCredit.png"
      })
    } 
    else if(that.data.creditValue >=60 && that.data.creditValue <90){
      that.setData({
        creditImg:"./creditImg/GoodCredit.png"
      })
    }
    else{
      that.setData({
        creditImg:"./creditImg/ExcellentCredit.png"
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