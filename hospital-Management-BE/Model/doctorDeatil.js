const mangoose=require('mongoose')
const doctorSchema=new mangoose.Schema({
    doctorName:{type:String,required:true},
    specialityId:{type:String,required:true},

})


module.exports=mangoose.model('doctor',doctorSchema)