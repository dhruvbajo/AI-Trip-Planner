'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Hotel } from './ChatBox'
import { Star, Wallet } from 'lucide-react'
import axios from 'axios'

type Props={
  hotel:Hotel
}

function HotelCardItem({hotel}:Props) { 

  useEffect(()=>{
    hotel&&GetGooglePlaceDetail();
  },[hotel])
  const GetGooglePlaceDetail = async () => {
    try {
      const result = await axios.post('/api/google-place-detail', {
        placeName: hotel?.hotel_name
      });
      console.log(result?.data);
    } catch (error) {
      console.log("Error fetching place:", error);
    }
  };
  return (
    <div className='flex flex-col gap-1'>
      <img src="./placeholder.png" alt="image" height={100} width={400} 
      className='rounded-xl shadow object-cover mb-2'
      />
      <h2 className='font-semibold text-md'>{hotel?.hotel_name}</h2>
      <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>
      <div className='flex justify-between items-center'>
      <p className='flex gap-2 text-green-600'><Wallet/>{hotel?.price_per_night}</p>
      <p className='text-yellow-500 flex gap-2 '><Star/>{hotel.rating}</p>
      </div>
      <Link href={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name} target='_blank'>
        <Button variant='outline' className='mt-1 w-full'>View</Button>
      </Link>
      {/* <p className='line-clamp-2 text-gray-500'>{hotel.description}</p> */}
    </div>
  )
}

export default HotelCardItem
