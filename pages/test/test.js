// pages/test/test.js

Page({

  data: {
    optionList:[{
      chanceType:"单选",
      chanceB:true,
      iconIndex:"", 
      content:"wwwwwwwwwwwwwwwwwwwwwwww",
      option:[
        {
          icon:"A",
          optionContent:"sssssssssssssssssss",
          selected:false
        },
        {
          icon:"B",
          optionContent:"sssssssssssssssssss",
          selected:false
        }
      ],
      answer:"B",
    },
    {
      chanceType:"多选",
      chanceB:false,
      iconIndex:"", 
      content:"wwwwwwwwwwwwwwwwwwwwwwww",
      option:[
        {
          icon:"A",
          optionContent:"dddddddddddddddddddddd",
          selected:false
        },
        {
          icon:"B",
          optionContent:"dddddddddddddddddddddddd",
          selected:false
        }
      ],
      answer:"B",
    },
  ],  
    optionIndex:0,
    // 单个题目
    optionListOne:{},
    sanswer:[],
    buttonT:"下一题",
    allScore:0
  },

  onLoad: function () {
    this.getQuestion()

    // var optionListOne = this.data.optionList[this.data.optionIndex]
    // this.setData({
    //   optionListOne
    // })
  },

  getQuestion(){
    var that = this
    wx.request({
      url: 'http://localhost:8080/paper/getExam', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        
        var adata = res.data.data
        console.log(adata)
        var optionList = []

        adata.forEach(function(item, index){
          let paper = {}
          if(item.type == 0){
            paper.chanceType = "单选"
            paper.chanceB = true
          }else{
            paper.chanceType = "多选"
            paper.chanceB = false
          }
          var option = [
            {
              icon:"A",
              optionContent:item.optionA,
              selected:false
            },
            {
              icon:"B",
              optionContent:item.optionB,
              selected:false
            },
            {
              icon:"C",
              optionContent:item.optionC,
              selected:false
            },
            {
              icon:"D",
              optionContent:item.optionD,
              selected:false
            },
          ]
          
          if(item.optionE != null){
           var roption = [
            {
              icon:"E",
              optionContent:item.optionE,
              selected:false
            },
            {
              icon:"F",
              optionContent:item.optionF,
              selected:false
            },
           ]
            option = option.concat(roption)
           }

          //  optionList[index].option = option
          //  optionList[index].content = item.content 
          //  optionList[index].answer = item.answer 
          paper.option = option
          paper.content = item.content 
          paper.answer = item.answer 
          optionList.push(paper)
        })
        

         that.setData({
           optionList,
         })
         var optionListOne = optionList[that.data.optionIndex]
         that.setData({
           optionListOne
         })
         console.log(that.data.optionList);

        }
    })
  },

  handLast(){
    var optionIndex = this.data.optionIndex - 1
    var optionListOne = this.data.optionList[optionIndex]
    this.setData({
      optionIndex,
      optionListOne,
      buttonT:"下一题"
    })
  },

  handNext(){
    var sanswer = this.data.sanswer
    var that = this
    if(this.data.optionListOne.chanceB == false){
      this.data.optionListOne.option.forEach(function(item, index){
        if(item.selected == true){
          if(sanswer[that.data.optionIndex] != undefined){
            sanswer[that.data.optionIndex] = sanswer[that.data.optionIndex] + item.icon
          }else{
            sanswer[that.data.optionIndex] = item.icon
          }         
        }
      })
    }
    this.setData({
      sanswer
    })

    var optionIndex = this.data.optionIndex + 1
    var optionListOne = this.data.optionList[optionIndex]
    
    if( optionIndex == this.data.optionList.length - 1 ){
      this.setData({
        optionIndex,
        optionListOne,
        buttonT:"提交"
      })
    }else if(optionIndex == this.data.optionList.length ){
      this.getScore()
    }else{
      this.setData({
        optionIndex,
        optionListOne,
      })
    }
   
  },

  handIsSelete(e){
    const {index}=e.currentTarget.dataset;
    var optionListOne = this.data.optionListOne
    var optionList = this.data.optionList
    optionListOne.iconIndex = index
    optionListOne.option[index].selected = true
    optionList[this.data.optionIndex] = optionListOne

    var sanswer = this.data.sanswer
    
    sanswer[this.data.optionIndex] = optionListOne.option[index].icon
    this.setData({
      optionList,
      optionListOne,
      sanswer,
    }) 
  },

  handIsSeleteMul(e){
    const {index}=e.currentTarget.dataset;
    var optionListOne = this.data.optionListOne
    var optionList = this.data.optionList
    optionListOne.option[index].selected = !optionListOne.option[index].selected
    optionList[this.data.optionIndex] = optionListOne


    this.setData({
      optionListOne,
      optionList
    })
  },

  getScore(){
    var allScore = 0
    var that = this
    this.data.optionList.forEach(function(item, index){
      if(item.answer == that.data.sanswer[index]){
        allScore = allScore + 10 
      } 
    })

    wx.setStorageSync('allScore', allScore)
    wx.setStorageSync('optionList', this.data.optionList)

    wx.navigateTo({
      url: '../score/score',
    })

    this.setData({
      allScore
    })
  }
})