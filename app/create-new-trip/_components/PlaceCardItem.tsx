'use client'

import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Activity } from './ChatBox';

type Props = {
  activity: Activity
}

function PlaceCardItem({ activity }: Props) {

  const [image, setImage] = useState<string>("./placeholder.png")

  useEffect(() => {
    if (activity?.place_name) {
      getPlaceImage()
    }
  }, [activity?.place_name])

  const getPlaceImage = async () => {
    try {
      const res = await axios.post('/api/place-image', {
        placeName: activity.place_name
      })

      // ✅ If API returns image → set it
      if (res?.data?.image) {
        setImage(res.data.image)
      }

    } catch (error) {
      console.log("Image fetch error:", error)
      // ❌ Do nothing → placeholder stays
    }
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

      {/* Image Section */}
      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={activity.place_name}
          onError={() => setImage("./placeholder.png")} // ✅ Extra fallback if image fails to load
          className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Ticket Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm flex items-center gap-1 shadow">
          <Ticket className="w-4 h-4 text-blue-500" />
          <span className="font-medium line-clamp-1">
            {activity?.ticket_pricing}
          </span>
        </div>

      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2">

        <h2 className="font-semibold text-lg line-clamp-1">
          {activity?.place_name}
        </h2>

        <p className="text-gray-500 text-sm line-clamp-2">
          {activity?.place_details}
        </p>

        <p className="flex items-center gap-2 text-orange-500 text-sm font-medium">
          <Clock className="w-4 h-4" />
          {activity?.best_time_to_visit}
        </p>

        <Link
          href={'https://www.google.com/maps/search/?api=1&query=' + activity?.place_name}
          target="_blank"
        >
          <Button
            size="sm"
            className="w-full mt-2 rounded-full transition-transform group-hover:scale-105"
          >
            View <ExternalLink className="ml-1 w-4 h-4" />
          </Button>
        </Link>

      </div>
    </div>
  )
}

export default PlaceCardItem
