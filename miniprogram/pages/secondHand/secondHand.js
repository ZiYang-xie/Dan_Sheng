//index.js
const app = getApp()

Page({
  data: {
  },
  
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current:'secondHand'
      })
    }
  },
})