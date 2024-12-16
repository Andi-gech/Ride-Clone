import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function UseSearchPlace(Text) {
   
    const getdata=async()=>{
       return await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${Text}&format=json&apiKey=d1939340aa2c4b9ebb031bb62610b690`)
        
    }
    return useQuery({ queryKey: ['search',Text], queryFn: getdata ,enabled: !!Text})
    
}

