const mangoose=require('mongoose')

const specialtySchema=new mangoose.Schema({
    name:{type:String,required:true}
})

module.exports=mangoose.model('Specality',specialtySchema)