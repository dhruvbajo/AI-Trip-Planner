"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi'
import TripDurationUi from './TripDurationUi'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { CreateTripDetail } from '../../../convex/tripDetail';
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/Provider'
import {v4 as uuidv4} from 'uuid'
import Itinerary from './Itinerary';
import { useSearchParams, useRouter } from 'next/navigation'


type Message={
  role:string,
  content:string,
  ui?:string,
}

export type TripInfo={
  budget:string,
  destination:string,
  duration:string,
  group_size:string,
  origin:string,
  hotels:Hotel[],
  itinerary:Itinerary,
}

export type Hotel={
  hotel_name:string;
  hotel_address:string;
  price_per_night:string;
  hotel_image_url:string;
  geo_coordinates:{
    latitude:number;
    longitude:number;
  }
  rating:number;
  description:string;
}

export type Activity={
  place_name:string;
  place_details:string;
  place_image_url:string;
  geo_coordinates:{
    latitude:number;
    longitude:number;
  };
  place_address:string;
  ticket_pricing:string;
  time_travel_each_location:string;
  best_time_to_visit:string;
}

export type Itinerary={
  map(arg0: (dayData: any) => { title: string; content: React.JSX.Element }): unknown
  day:number;
  day_plan:string;
  best_time_to_visit:string;
  activities:Activity[];
}

function ChatBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages,setMessages]=useState<Message[]>([]);
  const [userInput,setUserInput]=useState<string>();
  const [loading,setLoading]=useState(false);
  const [isFinal,setIsFinal] = useState(false);
  const [tripDetail,setTripDetail]=useState<TripInfo>();
  const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail)
  const {userDetail,setUserDetail}=useUserDetail();
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail();
  const onSend=async()=>{
    if(!userInput?.trim()) return;

    setLoading(true);
    setUserInput('');
    // const newMsg:Message={
    //   role:'user',
    //   content:userInput
    // }

    const newMsg: Message = {
    role: 'user',
    content: userInput.trim()
    };


    setMessages((prev:Message[])=>[...prev,newMsg]);

    const result=await axios.post('/api/aimodel',{
      messages:[...messages,newMsg],
      isFinal
    });

    console.log(result?.data)

    !isFinal&&setMessages((prev:Message[])=>[...prev,{
      role:'assistant',
      content:result?.data?.resp,
      ui:result?.data?.ui
    }]);

    if(isFinal){
      setTripDetail(result?.data?.trip_plan)  
      setTripDetailInfo(result?.data?.trip_plan)
      const tripId= uuidv4();
      await SaveTripDetail({
        tripDetail:result?.data?.trip_plan,
        tripId:tripId,
        uid:userDetail?._id
      })
    }
    setLoading(false);
  }

  const RenderGenerativeUi=(ui:string|undefined)=>{
    if(ui=='budget'){
      //budgetUI Component
      return <BudgetUi onSelectedOption={(v:string)=>
      {setUserInput(v);onSend()}} />
    }
    if(ui=='groupSize'){ 
      //GroupSizeComponent
      return <GroupSizeUi onSelectedOption={(v:string)=>{setUserInput(v);onSend()}} />
    }
    if (ui === "tripDuration") {
      return (
        <TripDurationUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    }
    if(ui==="final"){
      return <FinalUi viewTrip={()=>console.log()}
      disable={!tripDetail}
      />
    }
    return null;
  }

  useEffect(()=>{
    const lastMsg=messages[messages.length-1];
    if(lastMsg?.ui==='final'){
      setIsFinal(true);
      setUserInput('Ok, Great!')
    }
  },[messages]);

  useEffect(() => {
    const initialQuery = searchParams.get("query");

    if (initialQuery) {
      setUserInput(initialQuery);
      router.replace("/create-new-trip");
    }
  }, []);
  
  // useEffect(() => {
  //   if (userInput) {
  //     onSend();
  //   }
  // }, [userInput]);


  useEffect(()=>{
    if(isFinal&&userInput){
      onSend();
    }
  },[isFinal]);

  return (
  <div className="h-[81vh] flex flex-col border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">

    {messages?.length === 0 && (
      <EmptyBoxState
        onSelectOption={(v: string) => {
          setUserInput(v)
          onSend()
        }}
      />
    )}

    {/* Messages */}
    <section className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/30">

      {messages.map((msg: Message, index) =>
        msg.role === "user" ? (
          <div key={index} className="flex justify-end animate-fadeIn">
            <div className="max-w-lg bg-gradient-to-br from-primary to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md text-sm md:text-base">
              {msg.content}
            </div>
          </div>
        ) : (
          <div key={index} className="flex justify-start animate-fadeIn">
            <div className="max-w-lg bg-gray-100 text-black px-5 py-3 rounded-2xl shadow-md border border-gray-200">
              {msg.content}
              <div className="mt-3">
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          </div>
        )
      )}

      {loading && (
        <div className="flex justify-start">
          <div className="max-w-lg bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-md border border-white/10">
            <Loader className="animate-spin w-5 h-5 text-primary" />
          </div>
        </div>
      )}

    </section>

    {/* Input Section */}
    <section className="mt-4">
      <div className="relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-4 shadow-lg focus-within:ring-2 focus-within:ring-primary/40 transition-all">

        <Textarea
          placeholder="Start typing here..."
          className="w-full h-24 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-black placeholder:text-gray-500"
          onChange={(event) => setUserInput(event.target.value)}
          value={userInput}
        />

        <Button
          size="icon"
          className="absolute bottom-5 right-5 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
          onClick={() => onSend()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </section>

  </div>
)

}

export default ChatBox

