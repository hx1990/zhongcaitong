const log=console.log.bind(console)
const app=getApp()
let host = app.globalData.host
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userId:0,
  },
  onLoad(){
    let that=this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId:res.data.userId
        })
      }
    })
  },
  applycompany() {
    let that=this
    wx.request({
      url: `${host}/api/partner/apply/centre`,
      data: {
        userId:that.data.userId
      },
      success(res) {
        log(res)
        if (res.data.data.partnerAuth==2){
          wx.redirectTo({
            url: '/pages/applyIng/applyIng',
          })
        } else if (res.data.data.partnerAuth == 4 || res.data.data.partnerAuth == 5){
          wx.redirectTo({
            url: '/pages/partnerInfo/partnerInfo',
          })
        }else{
          wx.redirectTo({
            url: '/pages/applycompany/applycompany',
          })
        }
      }
    })
  },
  applynet() {
    let that = this
    wx.request({
      url: `${host}/api/partner/apply/centre`,
      data: {
        userId: that.data.userId
      },
      success(res) {
        log('网点',res)
        if (res.data.data.networkAuth == 2) {
          wx.redirectTo({
            url: '/pages/applyIng/applyIng',
          })
        } else if (res.data.data.networkAuth == 4 || res.data.data.networkAuth == 5) {
          wx.redirectTo({
            url: '/pages/netPointInfo/netPointInfo',
          })
        } else {
          wx.redirectTo({
            url: '/pages/netPoint/netPoint',
          })
        } 
      }
    })
   
  },
  
  applysender() {
    let that = this
    wx.request({
      url: `${host}/api/partner/apply/centre`,
      data: {
        userId: that.data.userId
      },
      success(res) {
        log(res)
        if (res.data.data.deliverLotteryAuth == 2) {
          wx.redirectTo({
            url: '/pages/applyIng/applyIng',
          })
        } else if (res.data.data.deliverLotteryAuth == 4 || res.data.data.deliverLotteryAuth == 5) {
          wx.redirectTo({
            url: '/pages/senderInfo/senderInfo',
          })
        } else {
          wx.redirectTo({
            url: '/pages/applysender/applysender',
          })
        }
      }
    })
   
  },
  
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