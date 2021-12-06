// pages/test/test.js

Page({

  data: {
    optionList:[], 
    optionIndex:0,
    // 单个题目
    optionListOne:{},
    sanswer:[],
    answer:"",
    buttonT:"下一题",
    allScore:0
  },

  onLoad: function () {
    var optionList = wx.getStorageSync('optionList')
    var optionListOne = optionList[this.data.optionIndex]
    var answer = optionListOne.answer
    this.setData({
      optionList,
      optionListOne,
      answer
    })
  },



  handLast(){
    var optionIndex = this.data.optionIndex - 1
    var optionListOne = this.data.optionList[optionIndex]
    var answer = optionListOne.answer
    this.setData({
      optionIndex,
      optionListOne,
      answer
    })
  },

  handNext(){

    var optionIndex = this.data.optionIndex + 1
    var optionListOne = this.data.optionList[optionIndex]
    
    if( optionIndex == this.data.optionList.length - 1 ){
      var answer = optionListOne.answer
      this.setData({
        optionIndex,
        optionListOne,
        buttonT:"退出",
        answer
      })
    }else if(optionIndex == this.data.optionList.length ){
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      var answer = optionListOne.answer
      this.setData({
        optionIndex,
        optionListOne,
        answer
      })
    }
   
  },
})