import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function GetMyOrders() {
    const getdata=async()=>{
       return await axios.get(`http://192.168.1.5:5000/api/ride/me`)
        
    }
    return useQuery({ queryKey: ['my-Ride'], queryFn: getdata })
    
}

export default GetMyOrders;