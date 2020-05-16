// miniprogram/pages/mine/tag/tag.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:app.globalData.userName,
    userAllTagNames:["标签1","标签2","标签3"],
    newTag:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:app.globalData.userName,
    })
    wx.request({
      url: 'mineTag_onLoad',
      data:{
        userName:app.globalData.userName,
      },
      success(res) {
        this.setData({
          userAllTagNames:res.data.userAllTagNames,
        })
      }
    })
  },

  inputTag(e){
    console.log(e.detail.value);
    this.setData({
      newTag: e.detail.value,
    })
  },

  addTags(){
    const blank = /^[ ]+$/;
    if(blank.test(this.data.newTag) || this.data.newTag===''){
      $Message({
        content: '标签不得为空',
        type: 'error'
      });
      return;
    }
    let list = this.data.userAllTagNames;
    list.push(this.data.newTag);
    this.setData({
      userAllTagNames: list,
    })
    wx.request({
      url: '/mineTag_addTag',
      data: {
        userName:app.globalData.userName,
        newTag:this.data.newTag,
      },
      success(res) {
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