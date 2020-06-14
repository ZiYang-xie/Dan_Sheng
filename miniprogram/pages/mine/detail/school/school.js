import { campus } from './ChinaUniversityList';
Page({
    data : {
        campus : []
    },
    onChange(event){
        console.log(event.detail,'click right menu callback data')
    },
    onReady(){
        let storeSchool = new Array(26);
        const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
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
        this.data.cities = storeSchool;
        this.setData({
            schools : this.data.cities
        })
    }
});
