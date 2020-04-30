// miniprogram/pages/releaseGoods/releaseGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLeftCata: false,
    goodType:[{
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
    }
    ],
  current: '',
  position: 'left',
  goodPrice: ''
  },

  handleCataChange({ detail = {} }) {
    this.setData({
        current: detail.value
    });
  },

  toggleLeft1() {
    this.setData({
        showLeftCata: !this.data.showLeftCata
    });
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