// 'use client'
// import React, { useEffect } from 'react'
// import ChatBox from './_components/ChatBox'
// import Itinerary from './_components/Itinerary';
// import { useTripDetail } from '../Provider';

// function CreateNewTrip() {
//   const { setTripDetailInfo } = useTripDetail();

//   useEffect(() => {
//     return () => {
//       setTripDetailInfo(null);
//     };
//   }, []);
//   return (
//     <div className='h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
//       <div>
//         <ChatBox/>
//       </div>
//       <div className='col-span-2'>
//         <Itinerary/>  
//       </div>
//     </div>
//   )
// }

// export default CreateNewTrip



'use client'
import React, { useEffect, Suspense } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../Provider'

function CreateNewTrip() {
  const { setTripDetailInfo } = useTripDetail();

  useEffect(() => {
    return () => {
      setTripDetailInfo(null);
    };
  }, [setTripDetailInfo]);

  return (
    <div className='h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
      
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <ChatBox />
        </div>
      </Suspense>

      <div className='col-span-2'>
        <Itinerary />
      </div>

    </div>
  )
}

export default CreateNewTrip