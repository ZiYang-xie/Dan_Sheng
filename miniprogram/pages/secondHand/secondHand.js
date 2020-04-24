//index.js
const app = getApp()

Page({
  data: {
    recommendGoods:[
      {
        goodName:"娃娃",
        goodPrice:"30元",
        goodReleaseTime:"2020/3/20",
        goodSeller:"吕昌泽",
        goodIntroduction:"无",
        goodPicture:"",
      },
      {
        goodName:"大娃娃",
        goodPrice:"50元",
        goodReleaseTime:"2020/3/25",
        goodSeller:"吕昌泽",
        goodIntroduction:"哈哈哈",
        goodPicture:""
      }
    ]
  },
  

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current:'secondHand'
      })
    }
  },
})