import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function GetPlaceName({lat,long}) {
    const getdata=async()=>{
       return await axios.get(`https://api.geoapify.com/v2/place-details?lat=9.02801323126019&lon=38.74446862831047&apiKey=d1939340aa2c4b9ebb031bb62610b690`)
        
    }
    return useQuery({ queryKey: ['todos'], queryFn: getdata })
    
}

export default GetPlaceName;