const log = console.log.bind(console)
let app = getApp()
let host = app.globalData.host
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partner: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(e) {
        log(e.data.userId)
        wx.request({
          url: `${host}/api/network/detailed`,
          data: {
            userId: e.data.userId,
          },
          method: 'GET',

          success(res) {
            log(res)
            that.setData({
              partner: res.data.data
            })
            log(that.data.partner)
          }
        })
      }
    })
  },

  applyAgine() {
    wx.redirectTo({
      url: '/pages/netPoint/netPoint?applyAgine=true',
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