const express=require('express')
const Router=express.Router()
Router.get('',(req,res)=>{

    res.send(
        {
            "api": "ride",
            "version": "1.0.0",
            "endpoints": ["get","post","put","delete"],
            "urls": ["http://localhost:5000/api/ride","http://localhost:5000/api/user","http://localhost:5000/api/driver","http://localhost:5000/api/ride"],
"[postRide json example]": {
    "driver": "123",
    "user": "123",
    "startLocation": {
        "latitude": 1,
        "longitude": 1
    },
    "endLocation": {
        "latitude": 1,
        "longitude": 1
    },
    "state":"ONRIDE",




} ,
"[putRide json example]": {
    "driver": "123",
    "user": "123",
    "startLocation": {
        "latitude": 1,
        "longitude": 1
    },
    "endLocation": {
        "latitude": 1,
        "longitude": 1
    },
    "state":"COMPLETED",

},
"[DIVER json example]":{
    "name": "123",
    "phone": 123,
    "password": "123",
    "country": "123",
    "plateNo": "123",
    "carType": "123",
},
"USER JSON EXAMPLE":{
    "name": "123",
    "phone": 123,
    "password": "123",
    "country": "123",
},

        }
    )
})
module.exports=Router
