// miniprogram/pages/releaseGoods/releaseGoods.js
const {$Message} = require('../../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRightCata: false,
    goodType: [{
      id: 1,
      name: '文具用品',
    }, {
      id: 2,
      name: '二手书籍'
    }, {
      id: 3,
      name: '学习资料'
    }, {
      id: 4,
      name: '宿舍日用',
    }, {
      id: 5,
      name: '健身器材',
    }, {
      id: 6,
      name: '3C数码',
    }, {
      id: 7,
      name: '个护美妆',
    }, {
      id: 8,
      name: '工艺礼品',
    }, {
      id: 9,
      name: '其他',
    }],
    goodName:'',
    goodIntroduction:'',
    goodClassification: '',
    position: 'left',
    goodPrice: ''
  },

  goodNameInput:function(e) {
    // console.log(e.detail.value);
    this.setData({
      goodName : e.detail.value,
    })
  },

  goodIntroductionInput:function(e){
    // console.log(e.detail.value);
    this.setData({
      goodIntroduction : e.detail.value,
    })
  },

  handleCataChange({
    detail = {}
  }) {
    console.log(detail.value);
    this.setData({
      goodClassification: detail.value
    });
  },

  toggleRight1() {
    this.setData({
      showRightCata: !this.data.showRightCata
    });
  },

  publishGood(){
    if (this.data.goodName === '' 
    || this.data.goodIntroduction === ''
    || this.data.goodClassification === '' 
    || this.data.goodPrice === '') {
      $Message({
        content: '商品名称、商品简介、商品分类、商品价格均不得为空',
        type: 'error'
      });
      return;
    }
    wx.request({
      url: 'releaseGood_release',
      data:{
        goodName:this.data.goodName,
        goodIntroduction:this.data.goodIntroduction,
        goodClassification:this.data.goodClassification,
        goodPrice:this.data.goodPrice
      },
      success(res) {
        $Message({
          content: '发布成功',
          type: 'success'
        });
      }
    })
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