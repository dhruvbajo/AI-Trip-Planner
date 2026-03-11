'use client'
import { Trip } from '@/app/my-trips/page';
import { useTripDetail, useUserDetail } from '@/app/Provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Itinerary from '../../create-new-trip/_components/Itinerary';

function ViewTrip() {
  const {tripid} = useParams(); 
  const {userDetail,setUserDetail}=useUserDetail();
  const convex = useConvex();
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
  const [tripData,setTripData]=useState<Trip>();

  useEffect(()=>{
    userDetail&&GetTrip();
  },[userDetail])

  const GetTrip=async()=>{
    const result = await convex.query(api.tripDetail.GetTripById,{
      uid:userDetail?._id,
      tripid:tripid+''
    });
    console.log(result);
    setTripData(result);
    setTripDetailInfo(result?.tripDetail)
  }

  return (
    <div>
      <Itinerary />
    </div>
  )
}

export default ViewTrip
