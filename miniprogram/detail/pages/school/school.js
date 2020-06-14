const campus = require("./ChinaUniversityList");
Page({
    data : {
        schools : []
    },
    onChange(event){
      switch(event.detail.index){
        case 1:
          wx.pageScrollTo({
            scrollTop: 100,
            duration: 10
          })
          break;
        case 14:
          wx.pageScrollTo({
            scrollTop: 9999999999,
            duration: 10
          })
      }
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
    }
});
