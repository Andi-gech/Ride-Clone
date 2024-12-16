import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function UseGetDriver(driverId) {
    
   
    const getdata=async()=>{
       return await axios.get(`http://192.168.1.5:5000/api/driver/${driverId}`)
        
    }
    return useQuery({ queryKey: ['driver',driverId], queryFn: getdata ,enabled: !!driverId})
    
}

