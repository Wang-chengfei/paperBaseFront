// pages/exercise/exercise.js
Page({


  data: {
    iconIndex:"",
    chanceType:"单选",
    chanceB:true,
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
    sanswer:"",
    buttonT:"提交",
    isAnswer:false
  },


  onLoad: function () {
    this.getQuestion()
  },

  getQuestion(){
    var that = this
    wx.request({
      url: 'http://localhost:8080/paper/getOne', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        var adata = res.data

        if(res.data.type == 0){
          that.setData({
            chanceType:"单选",
            chanceB:true,
          })
        }else{
          that.setData({
            chanceType:"多选",
            chanceB:false,
          })
        }

        var option = [
          {
            icon:"A",
            optionContent:adata.optionA,
            selected:false
          },
          {
            icon:"B",
            optionContent:adata.optionB,
            selected:false
          },
          {
            icon:"C",
            optionContent:adata.optionC,
            selected:false
          },
          {
            icon:"D",
            optionContent:adata.optionD,
            selected:false
          },
        ]
        
        if(adata.optionE != null){
         var roption = [
          {
            icon:"E",
            optionContent:adata.optionE,
            selected:false
          },
          {
            icon:"F",
            optionContent:adata.optionF,
            selected:false
          },
         ]
          option = option.concat(roption)
         } 

         that.setData({
           option,
           answer:adata.answer
         })

        }
    })
  },

  handIsAnswer(){
    
    if(this.data.buttonT == "提交"){
      this.setData({
        isAnswer:true,
        buttonT:"下一题"
      })
    }else{
      this.getQuestion()
      this.setData({
        isAnswer:false,
        buttonT:"提交"
      })
    }
    
  },

  handIsSelete(e){
    const {index}=e.currentTarget.dataset;
    this.setData({
      iconIndex:index,
      sanswer:index
    }) 
  },

  handIsSeleteMul(e){
    const {index}=e.currentTarget.dataset;
    var option = this.data.option
    option[index].selected = !option[index].selected
    this.setData({
      option
    })
  }
})