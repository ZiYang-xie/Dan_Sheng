// miniprogram/pages/information/informationDetail/informationDetail.js
const app = getApp()
Page({

  data: {
    sender:"杨朝辉",
    newInformation:[
      "你好(*´▽｀)ノノ",
      "之前卖的书还有货吗"
    ],
  },
  
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/informationDetail_onShow',
      data:{
        senderId:app.globalData.currentInformationSenderId,
        userOpenId:app.globalData.openId,
      },
      method:"POST",
      success(res){
        console.log(res.data)
        that.setData({
          sender:res.data.data.sender,
          newInformation:res.data.data.newInformation,
        })
      }
    })
  },
})