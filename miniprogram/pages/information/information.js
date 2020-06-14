// miniprogram/pages/information/information.js
const app = getApp()

Page({
  data: {
    myInformation :[
      {
        sender:"杨朝辉",
        openid:"13213213213",
        lastInformation:"哈哈",
        numberOfNewInformation:2
      },
      {
        sender:"沈征宇",
        openid:"13213213213",
        lastInformation:"在吗",
        numberOfNewInformation:1
      },
    ]
  },

  gotoDetail(e){
    app.globalData.currentInformationSenderId = e.currentTarget.dataset.openid;
    console.log(app.globalData.currentInformationSenderId);
    wx.navigateTo({
      url: 'informationDetail/informationDetail',
    })
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
    if(app.globalData.openId === null){
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
            wx.switchTab({
              url: '../mine/mine',
            })
          } else {//这里是点击了取消以后
            return
          }
        }
      })
    }else{
      var that = this;
      wx.request({
        url: app.globalData.baseUrl+'/information_onShow',
        data:{
          userOpenId:app.globalData.openId
        },
        method:"POST",
        success(res){
          console.log(res.data)
          that.setData({
            myInformation:res.data.data.myInformation,
          })
        }
      })
    }
  },
})