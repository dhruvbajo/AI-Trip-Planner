import React, { useEffect, useState } from 'react'
import { Trip } from '../page'
import { ArrowBigRightIcon } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

type Props={
  trip:Trip
}

function MyTripCardItem({trip}:Props) {
  const [image, setImage] = useState<string>("./placeholder.png")
  useEffect(() => {
    if (trip) {
      getPlaceImage()
    }
  }, [trip])

  const getPlaceImage = async () => {
    try {
      const res = await axios.post('/api/place-image', {
        placeName: trip?.tripDetail?.destination
      })

      if (res?.data?.image) {
        setImage(res.data.image)
      }

    } catch (error) {
      console.log("Image fetch error:", error)
    }
  }
  return (
    <Link href={'/view-trips/'+trip?.tripId} className='p-5 shadow rounded-2xl'>
      <img src={image?image:"/placeholder.png"} alt={trip.tripId} width={400} height={600} className='rounded-xl object-cover w-full h-[270px]' />
      <h2 className='flex gap-2 font-semibold text-xl mt-2'>{trip?.tripDetail?.origin }<ArrowBigRightIcon/>{trip?.tripDetail?.destination}</h2>
      <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} budget</h2>
    </Link>
  )
}

export default MyTripCardItem
