//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      currentInformationSenderId: null,
      currentDetailGood: 0, //存当前货物的id
      currentDetailTalk: 0, //存当前讨论的id
      tabBarHidden: false,
      isLogin: false,//默认值为false，到时候要改为false
      userInfo: {},
      openId: null,
      session_key:'',
      baseUrl:"https://flyhouselife.cn:8443",
      isIphoneX: false
    }

    wx.getSystemInfo({
      success: res => {
        console.log('手机信息res:' + res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X', 'iPhone XR', 'iPhone XS Max') != -1) {
          this.globalData.isIphoneX = true
        }
      }
    })
  },
})