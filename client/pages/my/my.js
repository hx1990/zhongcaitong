
const app = getApp()
let host = app.globalData.host
const log=console.log.bind(console)
Page({
  data: {
    userRole:'',
    userId:0,
    integral:0,
    role:'',
    partnerId:0,
    networkId:0,
    deliverId:0,
    partner:false,
    network:false,
    deliver:false
  },
  // 设置
  set(){
    wx.redirectTo({
      url: '/pages/set/set'
    })
  },
  
  onLoad(){
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(user){
        that.setData({
          userId: user.data.userId
        })
        wx.request({
          url: `${host}/api/user/info`,
          data: {
            userId: user.data.userId,
          },
          success(res) {
            log(res)
            let str=''
            if(res.data.data.userRole.indexOf('1')>=0){
              str+='合伙人 | '
              that.setData({
                partner:true,
                partnerId: res.data.data.partnerId
              })
            }
            if (res.data.data.userRole.indexOf('2') >= 0){
              str+='网点 | '
              that.setData({
                network: true,
                networkId: res.data.data.networkId
              })
            }
            if (res.data.data.userRole.indexOf('3') >= 0) {
              str += '送票员'
              that.setData({
                deliver: true,
                deliverId: res.data.data.deliverId
              })
            }
            if (str.trim().slice(-1) == '|'){
              str = str.trim().slice(0,-1)
            }
            wx.setStorage({
              key: 'roleId',
              data: {
                partnerId: res.data.data.partnerId,
                networkId: res.data.data.networkId,
                deliverId: res.data.data.deliverId
              }
            })
            that.setData({
              userRole:res.data.data.userRole,
              integral:res.data.data.integral,
              role:str,
            })
          }
        })
      },
    })
   
  },
 
  //扫码
  saoma(){
    let that=this
    app.globalData.saoma = true
    wx.scanCode({
      success: (res) => {
        log('扫描',res)
        let temp=res.path.split('?')
        let id=temp[1].split('=')[1]
        wx.request({
          url: `${host}/api/user/connect/cabinet`,
          data: {
            userId: that.data.userId,
            cabinetNum: id
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res) {
            log(res)
            if (res.data.code == 200) {
              that.setData({
                lotteryNum: res.data.data.lotteryNum,
                connect: true,
              })

              wx.setStorage({
                key: 'connect',
                data: {
                  connect: true,
                  lotteryNum: res.data.data.lotteryNum,
                  cabinetNum: id
                },
              })
              wx.showModal({
                title: '提示',
                content: `联机成功，当前联机ID为：${id},剩余票量为：${res.data.data.lotteryNum}张`,
                duration: 10,
                confirmText: '确认',
                cancelText: '返回',
              })
            }
          }
        })
      }
    })
  },
  //购票历史
  bayHisory(){
    wx.redirectTo({
      url: '/pages/bayhistory/bayhistory?userId=' + this.data.userId,
    })
  },
  // 分润
  dividend(){
    if(this.data.partner){
      wx.redirectTo({
        url: '/pages/dividend/dividend?partnerId=' + this.data.partnerId,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: `您当前不是合伙人，该功能只对合伙人开通，请申请成为合伙人方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
    
  },
  // 提现
  withdraw(){
    if (this.data.partner) {
        wx.redirectTo({
          url: '/pages/withdraw/withdraw',
        })
    }else{
        wx.showModal({
          title: '提示',
          content: `您当前不是合伙人，该功能只对合伙人开通，请申请成为合伙人方可使用！`,
          duration: 10,
          confirmText: '确认',
          cancelText: '返回',
        })
    }
  },

  //网点
  netPoint(){
    if (this.data.partner) {
      wx.redirectTo({
        url: '/pages/netList/netList',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是合伙人，该功能只对合伙人开通，请申请成为合伙人方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },
  
  //送票
  sendPaper(e) {
    if (this.data.partner) {
      wx.redirectTo({
        url: '/pages/material/material',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是合伙人，该功能只对合伙人开通，请申请成为合伙人方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },


  //开锁
  lock() {
    if (this.data.deliver) {
      wx.redirectTo({
        url: '/pages/lock/lock',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是送票员，该功能只对送票员开通，请申请成为送票员方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },

  //物料管理
  material(e){
    if (this.data.deliver) {
      wx.redirectTo({
        url: '/pages/material/material',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是送票员，该功能只对送票员开通，请申请成为送票员方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },
  //设备管理
  machine(){
    if (this.data.deliver) {
      wx.redirectTo({
        url: '/pages/machineList/machineList',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是送票员，该功能只对送票员开通，请申请成为送票员方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },
  //流水
  water(){
    if (this.data.network) {
      wx.redirectTo({
        url: '/pages/water/water?networkId=' + this.data.networkId,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是网点，该功能只对网点开通，请申请成为网点方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },

  //网点提现
  networkDraw(){
    if (this.data.network) {
      wx.redirectTo({
        url: '/pages/withdraw/withdraw',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是网点，该功能只对网点开通，请申请成为网点方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },

  //设备
  networkMachine() {
    if (this.data.network) {
      wx.redirectTo({
        url: '/pages/NmachineList/NmachineList',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: `您当前不是网点，该功能只对网点开通，请申请成为网点方可使用！`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }
  },
  
 //客服
  server(){
    // if (this.data.network) {
      wx.redirectTo({
        url: '/pages/server/server',
      })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: `您当前不是网点，该功能只对网点开通，请申请成为网点方可使用！`,
    //     duration: 10,
    //     confirmText: '确认',
    //     cancelText: '返回',
    //   })
    // }
  },
  //申请
  apply() {
    wx.redirectTo({
      url: '/pages/apply/apply',
    })
  },
  
  onShareAppMessage: function () {
  
  }
})