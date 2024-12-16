import React from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function UseRequestRide() {
    
    const postdata=async(data)=>{
        console.log(data)
       return await axios.post(`http://192.168.1.5:5000/api/ride`,data)
        
    }
    return useMutation({ mutationKey: ['Request'], mutationFn: postdata })
    
}

