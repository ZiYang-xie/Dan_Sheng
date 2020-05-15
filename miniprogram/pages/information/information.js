// miniprogram/pages/information/information.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentUserName : app.globalData.userName,
    myInformation :[
      {
        sender:"杨朝辉",
        senderNumber:"18302010057",
        lastInformation:"哈哈",
        numberOfNewInformation:0
      },
      {
        sender:"沈征宇",
        senderNumber:"183020100XX",
        lastInformation:"在吗",
        numberOfNewInformation:1
      },
    ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentUserName:app.globalData.userName,
    })
    wx.request({
      url: '/information_onLoad',
      data:{
        userName:this.data.currentUserName,
      },
      success(res){
        this.setData({
          myInformation:res.data.myInformation,
        })
        console.log(res.data)
      }
    })
    console.log(this.data.currentUserName)
  },

  gotoDetail(e){
    app.globalData.currentInformationSender = e.currentTarget.dataset.sender;
    console.log(app.globalData.currentInformationSender);
    wx.navigateTo({
      url: 'informationDetail/informationDetail',
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current:'information'
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