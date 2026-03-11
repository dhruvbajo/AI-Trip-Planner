"use client";

import React, { useEffect, useState } from 'react'
import { Timeline } from '@/components/ui/timeline'
import { Hotel, TripInfo } from './ChatBox';
import { Clock, Star, Ticket, Timer, Wallet, Calendar, ExternalLink, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionCtx } from '../../../convex/_generated/server';
import Link from "next/link"
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/Provider';


const Itinerary = () => {
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
  const [tripData,setTripData]=useState<TripInfo|null>(null)
  useEffect (()=>{
    tripDetailInfo&&setTripData(tripDetailInfo)
  },[tripDetailInfo])
  const data = tripData?[
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {tripData?.hotels.map((hotel:Hotel,index:number)=>(
            <HotelCardItem hotel={hotel}/>
          ))}  
        </div>
      ),
    },
    //@ts-ignore
    ...(tripData?.itinerary??[]).map((dayData)=>({
        title:`Day ${dayData?.day}`,
        content:(
            <div>
                <p>Best Time :{dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {dayData?.activities.map((activity:any,index:any)=>(
                        <PlaceCardItem activity={activity}/>
                    ))}
                </div>
            </div>
        )
    }))
  ]:[];
  return (
    // <div className="relative w-full h-[83vh] overflow-auto">
    //     {/* @ts-ignore */}
    //   {tripData?<Timeline data={data} tripData={tripData}/>
    //   :
    //   <div>
    //     <h2 className='flex gap-2 text-3xl text-white items-center absolute bottom-20'><ArrowLeft/>getting to know you to build perfect trip here ...</h2>
    //     <img src="/travel.png" alt='travel' width={'800'} height={'800'} className='w-full h-full object-cover rounded-3xl'/>
    //   </div>
    //   }
    // </div>
    <div className="relative w-full h-[83vh] overflow-auto rounded-3xl">

        {tripData ? (
            <Timeline data={data} tripData={tripData} />
        ) : (
            <div className="relative w-full h-full">

            {/* Background Image */}
            <img
                src="/travel.png"
                alt="travel"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                <h2 className="flex items-center gap-3 text-white text-2xl md:text-4xl font-semibold max-w-2xl leading-snug">
                <ArrowLeft className="w-7 h-7" />
                Getting to know you to build your perfect trip...
                </h2>

                <p className="text-gray-200 mt-3 text-sm md:text-lg">
                Sit back while we create your personalised itinerary 
                </p>

            </div>

            </div>
        )}

    </div>

  );
}


export default Itinerary


