// updateLocation.test.js

const ioClient = require('socket.io-client');
const { server } = require('../index'); // Import your server instance
const socketUrl = 'http://192.168.56.2:5000'; // Update with your server URL
const mongoose = require('mongoose');
let socket;
jest.useRealTimers();

beforeAll((done) => {
  socket = ioClient.connect(socketUrl);
  socket.on('connect', () => {
    done();
  });
});

afterAll((done) => {
  if (socket.connected) {
    socket.disconnect();
  }
  done();
},7000);

describe('updateLocation socket event', () => {
  test('should update driver location', (done) => {
    const data = {
      driverId: '65fc55b0f0dd83f4ec15fd1d',
      latitude: 40.7128,
      longitude: -74.0060,
    };

    socket.emit('updateLocation', data);
  

    socket.emit('getDriversWithinRadius', {
      latitude: 40.7128,
      longitude: -74.0060,

    });
    socket.on('driversWithinRadius', (drivers) => {
      expect(drivers.length).toBeGreaterThan(0);
      expect(drivers).toBe(data.latitude);
      done();
    })
  });

  
});
afterAll(async () => {
    await mongoose.connection.close();
  },400);
// Add more test cases for different scenarios
