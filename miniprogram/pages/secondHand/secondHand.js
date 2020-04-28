//用于调用全局变量
const app = getApp()

Page({
  data: {
    currentSubPage: "recommend",
    //当前页面的商品
    classes: [{
      i_class: "cards",
      i_class_header: "cards-header",
      i_class_content: "cards-content",
      i_class_content: "cards-content"
    }],
    currentGoods: [{
        goodName: "文具-笔",
        goodPrice: "5元",
        goodReleaseTime: "2020/3/20",
        goodSeller: "售卖人:"+"谢子飏",
        goodIntroduction: "几支笔",
        goodImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587917214759&di=7f9b2d53641e3b67ba3f73ef86465dd1&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777322e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69322f543174526f355866426758585858585858585f2121302d6974656d5f7069632e6a7067.jpg",
      },
      {
        goodName: "数学分析",
        goodPrice: "30元",
        goodReleaseTime: "2020/3/25",
        goodSeller: "售卖人:"+"法外狂徒张三",
        goodIntroduction: "数学分析，从入门到入土",
        goodImg: "http://img3.imgtn.bdimg.com/it/u=86994036,3090435963&fm=15&gp=0.jpg"
      }
    ]
  },

  changeSubPage({detail}) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage,
    });
    wx.request({
      //将当前页面是推荐还是热榜发给后端
      url: '/secondHand_changeSubPage',
      data: {
        currentSubPage: currentSubPage,
        userName: app.globalData.userName,//全局变量
      },
      success(res) {
        //得到返回的数据
        this.currentGoods = res.data.currentGoods;
        console.log(res.data)
      }
    });
  },

  onLoad: function () {
    wx.request({
      //默认页面是推荐，所以进入时应该
      url: '/secondHand_recommend',
      data: {
        //发送给后端当前用户的名称
        userName: app.globalData.userName,
      },
      success(res) {
        //得到返回的数据，根据用户的标签进行商品推荐
        this.currentGoods = res.data.currentGoods;
        console.log(res.data)
      }
    });
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current: 'secondHand'
      })
    }
  },

  formSubmit: function (e) {
    var searchValue = e.detail.value.searchValue;
    wx.request({
      //将搜索内容发给后端
      url: '/secondHand_search',
      data: {
        searchValue: searchValue,
      },
      success(res) {
        //得到返回的数据
        this.currentGoods = res.data.currentGoods;
        console.log(res.data)
      }
    });
    console.log('form发生了submit事件，携带数据为：', searchValue)
  },

  gotoDetail:function (e) {
    app.globalData.currentDetailGood = e.currentTarget.dataset.good_name;
    console.log(app.globalData.currentDetailGood);
    wx.navigateTo({
      url: 'goodDetail/goodDetail',
    })
  },

  btnAni: function(e){
      var txt = document.getElementsByClassName("search-box")
  }
})
