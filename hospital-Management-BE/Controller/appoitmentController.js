const appoitmentSchema=require('../Model/appoitmenetSchema')
let getAppoitment=async (req,res,next)=>{
    try{
        const getAppoitment=await appoitmentSchema.find()
        res.status(200).send(getAppoitment)
    }catch(error){
        res.status(400).send({msg:error.message})
    }
}

let saveAppoitment=async (req,res,next)=>{
    try{
        const apoitmentList=new appoitmentSchema({
            doctor:req.body.doctor,
            date:req.body.date,
            patient:req.body.patient,
        })
        await apoitmentList.save()
        res.status(201).send({msg:'Appoitment Saved Successfully'})
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}


let updateApoitment=async (req,res,next)=>{
    const appoitmentId=req.params.id
    const {patient,date,doctor}=req.body
    try{
        const apoitmentList=await appoitmentSchema.findById(appoitmentId)
        if(!apoitmentList){
            res.status(404).send({msg:'Not Found'})
        }else{
            apoitmentList.patient=patient
            apoitmentList.date=date
            apoitmentList.doctor=doctor
            await apoitmentList.save()
            res.status(200).send({msg:'Updated Successfully'})
        }
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}


const DeleteAppoitment=async (req,res,next)=>{
    const apoitmentId=req.params.id
   try{
    await appoitmentSchema.findByIdAndDelete(apoitmentId)
    res.status(200).send({msg:'Deleted Successfully'})
    }catch(error){
        res.status(500).send({msg:error.message})
    }
}

module.exports={DeleteAppoitment,updateApoitment,getAppoitment,saveAppoitment}