import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function UsePlaceNames(lat,long) {
    console.log(lat,long)
    const getdata=async()=>{
       return await axios.get(`https://api.geoapify.com/v2/place-details?lat=${lat}&lon=${long}&apiKey=d1939340aa2c4b9ebb031bb62610b690`)
        
    }
    return useQuery({ queryKey: ['todos',lat,long], queryFn: getdata ,enabled: !!lat && !!long})
    
}

