// pages/score/score.js
Page({

  data: {
    allScore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var allScore = 0
    allScore = wx.getStorageSync('allScore')
    console.log(allScore);
    
    this.setData({
      allScore
    })
  },

  handReturn(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  handLook(){
    wx.navigateTo({
      url: '../record/record',
    })
  }
})