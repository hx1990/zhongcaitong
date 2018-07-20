//app.js
const log=console.log.bind(console)
App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
  },

  globalData: {
    userInfo: null,
    host:'https://mp.zjzct.cn',
    cabinetNo:0,
  },
 
  onShow(e){
    log('场景', e, decodeURIComponent(e.scene))
    if(e.scene==1011){
      log('进入场景', e)
      this.globalData.cabinetNo = Number(e.query.scene)
    }else{
     if (this.globalData.saoma){
       log('扫码跳转',e, this.globalData.saoma)
      //  this.globalData.cabinetNo = Number(e.query.id)
       this.globalData.saoma=false
     }else{
       wx.removeStorage({
         key: 'connect'
       })
      this.globalData.cabinetNo = 0
     }
      
    }
    
  },
  onHide(e){
    let that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        wx.getStorage({
          key: 'connect',
          success(){
            wx.request({
              url: that.globalData.host + '/api/user/disconnect/cabinet',
              method: 'GET',
              data: {
                userId: res.data.userId
              },
              success(suc) {
                log('退出成功',suc)

              }
            })
          },
          fail(err){
            log('退出失败',err)
          }
        })
      },

      fail(err){
        log('获取失败',err)
      }
    })
  }
})