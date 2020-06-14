const campus = require("./ChinaUniversityList");
const { $Toast } = require('../../../dist/base/index');

Page({
    data : {
        schools : []
    },
    onLoad(){
      $Toast({
        content: '加载中',
        type: 'loading'
      });
    },
    onChange(event){
      console.log(event.detail.index,'click right menu callback data')
    },
    onReady(){
        let storeSchool = new Array(15);
        const words = ["A","B","C","F","G","H","J","L","N","Q","S","T","X","Y","Z"]
        words.forEach((item,index)=>{
            storeSchool[index] = {
                key : item,
                list : []
            }
        })
        campus.forEach((item)=>{
          let firstName = item.id.substring(0,1);
          let index = words.indexOf( firstName );
          storeSchool[index].list.push({
            name : item.province,
            key : firstName
        });
        })
        storeSchool.forEach((item)=>{
          console.log(item);
        })
        this.data.schools = storeSchool;
        this.setData({
            schools : this.data.schools
        })
    },
    handleTap(event){
      const eindex = event.currentTarget.dataset.index;
      console.log(eindex);
      const item = this.getCurrentItem(eindex);
      this.setData({
          scrollTop : item.top,
          currentName : item.currentName,
          isTouches : true
      })
      this.triggerCallback({
          index : eindex,
          current : item.currentName
      })
  },
});
