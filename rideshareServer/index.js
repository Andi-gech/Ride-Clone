const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db/connect');
const userRouter = require('./Router/user');
const rideRouter = require('./Router/ride');
const indexRouter = require('./Router/index');
const driverRouter = require('./Router/driver');
const geolib = require('geolib');
const { Ride } = require('./Model/ride');

const {validateDiver,validateDriverUpdate,Diver}=require('./Model/diver');
const { User } = require('./Model/user');
const mongoose = require('mongoose');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api/driver', driverRouter);
app.use('/api/user', userRouter);
app.use('/api/ride', rideRouter);
app.use('', indexRouter);



io.on('connection', (socket) => {

    socket.emit('onlinestatus',true);




    socket.on('updateLocation',async (data) => {
        const { driverId, latitude, longitude } = data;
        const isvalid = mongoose.Types.ObjectId.isValid(driverId);
        if (!isvalid) {
            return;
        }
        console.log(latitude,longitude,driverId)
        const diver= await Diver.findByIdAndUpdate(driverId, {
            $set: { "lastLocation.coordinates": [latitude, longitude] }
        }, { new: true })  
        if(!diver) return
        socket.to(driverId).emit('locationUpdate', {
            driverId: driverId,
            latitude: latitude,
            longitude: longitude
        });
        
      
    });

    const findNearbyDrivers = async (longitude, latitude, maxDistance) => {
 
       
       
        const drivers = await Diver.find();
      
        return drivers;
      };
   

    socket.on('getDriversWithinRadius', async(data) => {
        const { customerLatitude, customerLongitude } = data;
        const drivers= await findNearbyDrivers(customerLongitude, customerLatitude, 1000);
        drivers.forEach(driver => socket.join(driver._id));
        socket.emit('driversWithinRadius', drivers);

    });
    socket.on('driverAvailable', async (data) => {
        const { driverId } = data;
        const diver = await Diver.findByIdAndUpdate(driverId, {
            $set: { "available": true }
        }, { new: true })
        socket.emit(driverId + 'available', diver)
        
    })
    socket.on('Ride', async(data) => {
        const { id, latitude, longitude } = data;
        const isvalid = mongoose.Types.ObjectId.isValid(id);
        if (!isvalid) {
            return;
        }
        const ride = await Ride.findOne({ _id: id });
        if (!ride) {
            return;
    
    
        }
        console.log("ride",ride)
        const distance = geolib.getDistance(
            { latitude: latitude, longitude: longitude },
            { latitude: ride.startLocation.latitude, longitude: ride.startLocation.longitude }
        )
        
        if (distance < 100) {
            socket.emit(id+'RideDriverStatus', "Driver is Arrived");  
        }
        socket.emit(id+'RideDriverStatus', "Driver is on the way");
        const distance2 = geolib.getDistance(
            { latitude: latitude, longitude: longitude },
            { latitude: ride.endLocation.latitude, longitude: ride.endLocation.longitude }
        )
        if (distance2 < 100) {
            socket.emit(id+'RideDriverStatus', "Ride is completed");
        }
        
      
    
    
    
    
        
           
       })
  
    socket.on('StartRide',async (data) => {
        const {id}=data
        const ride=await Ride.findOneAndUpdate({_id:id},{State:'started'},{new:true})
        
        socket.emit(id+'Status','started')
    })
    socket.on('CancelRide', async (data) => {
        const { id } = data;
        const ride = await Ride.findOneAndUpdate({ _id: id }, { State: 'cancelled' }, { new: true });
        socket.emit(id + 'Status', 'cancelled');
    });
    
  
    socket.on('EndRide',async (data) => {
        const {id}=data
        const ride=await Ride.findOneAndUpdate({_id:id},{State:'completed'},{new:true})
       socket.emit(id+'Status','completed')
    })
    socket.on('ridePrice',async(data)=>{
        const {id,latitude,longitude}=data
        const ride=await Ride.findOne({_id:id})
        const distance=geolib.getDistance(
            {latitude:latitude,longitude:longitude},
            {latitude:ride.startLocation.latitude,longitude:ride.startLocation.longitude}
        )
        socket.emit(id+'ridePrice',distance*10)



    })
   
    

    

  
    

    socket.on('disconnect', () => {
       socket.emit('onlinestatus',false);
    });
});

const PORT = 5000;
connectDB().then(() => {
    server.listen(PORT,'192.168.56.2', () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})
module.exports = server

