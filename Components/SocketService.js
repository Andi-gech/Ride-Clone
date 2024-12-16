import { io } from 'socket.io-client';

const socket = io('http://192.168.1.5:5000'); // Update with your server's IP address

const SocketService = {
    connect: () => {
        socket.connect();
    },
    disconnect: () => {
        socket.disconnect();
    },
    updateLocation: (driverId, latitude, longitude) => {
        socket.emit('updateLocation', { driverId, latitude, longitude });
    },
    getDriversWithinRadius: (customerLatitude, customerLongitude, callback) => {
        socket.emit('getDriversWithinRadius', { customerLatitude, customerLongitude });
        socket.on('driversWithinRadius', (drivers) => {
            callback(drivers);
        });
    },
    GetDriverLocation:(driverId, callback) => {
        console.log(driverId)
        socket.on(driverId+'location', (location) => {
            console.log(location)
            callback(location);
            
        })
    },
    GetRideStatus:(id,latitude,longitude, callback) => {
        socket.emit('Ride',{id,latitude,longitude})
        socket.on(id + 'RideDriverStatus', (status) => {
            callback(status);
            
        })

        
    }
  
    
};

export default SocketService;
