const mongoose=require('mongoose')

const appoitmentSchema=mongoose.Schema({
    doctor:{type:String,required:true},
    patient:{type:String,required:true},
    date:{type:Date,required:true},
})
module.exports=mongoose.model('Appoitment',appoitmentSchema)