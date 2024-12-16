import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function UseGetRoute(lat1,long1,lat2,long2) {
    
   
    const getdata=async()=>{
       return await axios.get(`https://api.geoapify.com/v1/routing?waypoints=${lat1},${long1}|${lat2},${long2}&mode=light_truck&apiKey=d1939340aa2c4b9ebb031bb62610b690`)
        
    }
    return useQuery({ queryKey: ['todos',lat1,long1,lat2,long2], queryFn: getdata ,enabled: !!lat1 && !!long1 && !!lat2 && !!long2})
    
}

