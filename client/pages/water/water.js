const log = console.log.bind(console)
const app = getApp()
let host = app.globalData.host
Page({
  data: {
    profitBalance: 0,
    takeOutCash: 0,
    todayTotalMoney: 0,
    networkId: 0,
    
    click:false
    
  },
  onLoad(e) {
    let that = this
    this.setData({
      networkId: e.networkId
    }

    )
    wx.request({
      url: host + '/api/network/profit/info',
      data: {
        networkId: e.networkId
      },
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            profitBalance: res.data.data.profitBalance,
            takeOutCash: res.data.data.takeOutCash,
            todayTotalMoney: res.data.data.todayTotalMoney
          })
        }
      }
    })
  },
  bindDateChange: function (e) {
    let that=this
    this.setData({
      date: e.detail.value,
      click:true
    })
    wx.request({
      url: host + '/api/network/history/profit',
      data: {
        networkId: that.data.networkId,
        date: e.detail.value
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', 
      },
      success(res) {
        if (res.data.code == 200) {
          log('aaaa',res)
          that.setData({
            data: res.data.data,
           
          })
        }

      }
    })
    // wx.redirectTo({
    //   url: '/pages/networkHistory/networkHistory?date=' + e.detail.value,
    // })
  },
  
  getMoney() {
    wx.redirectTo({
      url: '/pages/withdraw/withdraw',
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