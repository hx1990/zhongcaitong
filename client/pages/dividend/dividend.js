const log=console.log.bind(console)
const app=getApp()
let host = app.globalData.host
Page({
  data: {
    profitBalance:0,
    takeOutCash:0,
    todayTotalMoney:0,
    partnerId:0
  },
  onLoad(e) {
    let that=this
    this.setData({
      partnerId: e.partnerId
    }
      
    )
    wx.request({
      url: host+'/api/partner/profit/info',
      data:{
        partnerId:e.partnerId
      },
      method:'GET',
      success(res){
          if(res.data.code==200){
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    wx.redirectTo({
      url: '/pages/dividendHistory/dividendHistory?date=' + e.detail.value,
    })
  },
  detail(){
    wx.redirectTo({
      url: '/pages/dividendDetail/dividendDetail?partnerId='+this.data.partnerId,
    })

  },
  getMoney(){
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