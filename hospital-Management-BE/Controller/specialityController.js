const express=require('express')
const specialtySchema=require('../Model/specialitySchema')

let getSpecilaty= async (req,res,next)=>{

    try{
        let specalityList= await specialtySchema.find()
        res.status(200).send(specalityList)
    }catch{
        res.status(500).send({msg:error.message})
    }
    
}

let postSpecality=async (req,res,next)=>{
    console.log('Request received:', req.body);
    try {
        
        let saveDoctor = new specialtySchema({
            name: req.body.name,
        });
        console.log('Doctor to save:', saveDoctor);
        let saveList = await saveDoctor.save();
        console.log('Doctor saved:', saveList);
        res.status(201).send({ msg: 'Doctor Added Successfully', doctor: saveList });
    } catch (error) {
        console.error('Error saving doctor:', error);
        res.status(400).send({ msg: error.message });
    }
}

module.exports={getSpecilaty,postSpecality}