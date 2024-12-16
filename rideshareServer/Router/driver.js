const express=require('express')
const Router=express.Router()
const {validateDiver,validateDriverUpdate,Diver}=require('../Model/diver')


Router.get('',async(req,res)=>{
    try{
const diver=await Diver.find()
    res.send(diver)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }

})
Router.post('',async(req,res)=>{
    try{
        const {error}=validateDiver(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const diver=new Diver(req.body)
        await diver.save()
        res.send(diver)

    }
    catch(err){
        res.status(500).send({message:err.message})
    }

    
})
Router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const {error}=validateDriverUpdate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const diver=await Diver.findByIdAndUpdate(id,req.body,{new:true})
        if(!diver) return res.status(404).send('The diver with the given ID was not found.')
        res.send(diver)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
    
})
Router.get('/:id',async(req,res)=>{
    try{
        const diver=await Diver.findById(req.params.id)
        if(!diver) return res.status(404).send('The diver with the given ID was not found.')
        res.send(diver)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})
Router.delete('/:id',async(req,res)=>{
    try{
        const diver=await Diver.findByIdAndDelete(req.params.id)
        if(!diver) return res.status(404).send('The diver with the given ID was not found.')
        res.send(diver)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

module.exports=Router