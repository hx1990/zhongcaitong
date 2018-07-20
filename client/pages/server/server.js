const app = getApp()
let host = app.globalData.host
const log = console.log.bind(console)
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that=this
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          userId:res.data.userId
        })
      },
    })
    
  },
  callPhone(){
    wx.showModal({
      title: '提示',
      content: '是否客服电话：400 1668 500',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '4001668500'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  addReark(e){
    log(e.detail)
    this.setData({
      content:e.detail.value
    })
  },
  addPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  subMit(){
    let that=this
    wx.request({
      url: `${host}/api/user/comment`,
      method: "POST",
      data: {
        userId:that.data.userId,
        phone:that.data.phone,
        content: that.data.content
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res){
        log('成功',res)
      }
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