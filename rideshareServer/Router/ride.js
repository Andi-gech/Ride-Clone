const express=require('express')
const Router=express.Router()
const {Ride,validateRide,validateRideUpdate}=require('../Model/ride')
const { Diver } = require('../Model/diver')
Router.get('',async(req,res)=>{

    try{
    const ride=await Ride.find()
        res.send(ride)
        }
        catch(err){
            res.status(500).send({message:err.message})
        }
})
Router.get('/me',async (req, res) => {
    try {
        console.log('/me hhs')
        const latestOrder = await Ride.findOne({ user: '65fa26bc820db967b87fc138' })
        
        console.log(latestOrder)
        
    
        res.send(latestOrder);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})
Router.get('/nearByOrders', async (req, res) => {
    try {
        const { currentLatitude, currentLongitude } = req.query;

        const rides = await Ride.find({
            startLocation: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(currentLongitude), parseFloat(currentLatitude)],
                    },
                    $maxDistance: 200, // 200 meters
                },
            },
        });

        res.send(rides);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

Router.post('',async(req,res)=>{

    try{
        const {error}=validateRide(req.body)
       
        
        if(error) return res.status(400).send(error.details[0].message)
        
        const nearestDriver = await Diver.findOne({
            lastLocation: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [
                    req.body.startLocation.latitude,
                    req.body.startLocation.longitude
                  ]
                },
                $maxDistance: 5000 // 5km
              }
            }
          });
          if (!nearestDriver) { 
            return res.status(404).send('No driver found');
          }
          const body = {
            driver: nearestDriver._id,
            user:req.body.user,
            startLocation: req.body.startLocation,
            endLocation: req.body.endLocation,
            state:"ONRIDE"
          }
          
        
        const ride=new Ride(body)
        
        await ride.save()
        console.log(ride)
        res.send(ride)
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:err.message})
    }
})
Router.put('/:id',async(req,res)=>{

    try{
        const {error}=validateRideUpdate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const ride=await Ride.findByIdAndUpdate(req.params.id,req.body)
        if(!ride) return res.status(404).send('The ride with the given ID was not found.')
        res.send(ride)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})
Router.delete('/:id',async(req,res)=>{

    try{
        const ride=await Ride.findByIdAndDelete(req.params.id)
        if(!ride) return res.status(404).send('The ride with the given ID was not found.')
        res.send(ride)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})
Router.get('/:id',async(req,res)=>{

    try{
    const ride=await Ride.findById(req.params.id)
        res.send(ride)
        }
        catch(err){
            res.status(500).send({message:err.message})
        }
        
})
Router.put('/id/acceptRide',async(req,res)=>{

    try{
        const {error}=validateRideUpdate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const ride=await Ride.findByIdAndUpdate(req.params.id,{driver:req.body.driver})
        if(!ride) return res.status(404).send('The ride with the given ID was not found.')
        res.send(ride)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

module.exports=Router