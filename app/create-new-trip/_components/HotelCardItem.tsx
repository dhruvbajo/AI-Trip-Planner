'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import { Star, Wallet } from 'lucide-react'
import axios from 'axios'

type Props = {
  hotel: Hotel
}

function HotelCardItem({ hotel }: Props) {

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (hotel) {
      getPlaceImage()
    }
  }, [hotel])

  const getPlaceImage = async () => {
    try {
      const result = await axios.post('/api/place-image', {
        placeName: hotel?.hotel_name
      })

      setImage(result?.data?.image)

    } catch (error) {
      console.log("Error fetching place:", error)
    }
  }

  // return (
  //   <div className='flex flex-col gap-1'>

  //     <img
  //       src={image || "./placeholder.png"}
  //       alt="hotel"
  //       height={100}
  //       width={400}
  //       className='rounded-xl shadow object-cover mb-2'
  //     />

  //     <h2 className='font-semibold text-md'>{hotel?.hotel_name}</h2>
  //     <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>

  //     <div className='flex justify-between items-center'>
  //       <p className='flex gap-2 text-green-600'>
  //         <Wallet />{hotel?.price_per_night}
  //       </p>

  //       <p className='text-yellow-500 flex gap-2'>
  //         <Star />{hotel.rating}
  //       </p>
  //     </div>

  //     <Link
  //       href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name}
  //       target='_blank'
  //     >
  //       <Button variant='outline' className='mt-1 w-full'>View</Button>
  //     </Link>

  //   </div>
  // )
  return (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

    {/* Image Section */}
    <div className="relative overflow-hidden">
      <img
        src={image || "./placeholder.png"}
        alt="hotel"
        className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Rating Badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm flex items-center gap-1 shadow">
        <Star className="w-4 h-4 text-yellow-500" />
        <span className="font-medium">{hotel?.rating}</span>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-4 flex flex-col gap-2">

      <h2 className="font-semibold text-lg line-clamp-1">
        {hotel?.hotel_name}
      </h2>

      <p className="text-gray-500 text-sm line-clamp-1">
        {hotel?.hotel_address}
      </p>

      {/* Price + Button Row */}
      <div className="flex justify-between items-center mt-2">

        <p className="flex items-center gap-2 text-green-600 font-semibold">
          <Wallet className="w-4 h-4" />
          {hotel?.price_per_night}
        </p>

        <Link
          href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name}
          target="_blank"
        >
          <Button
            size="sm"
            className="rounded-full px-4 transition-transform group-hover:scale-105"
          >
            View
          </Button>
        </Link>

      </div>
    </div>

  </div>
)

}

export default HotelCardItem
