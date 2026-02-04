"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const suggestions=[
  {
    title:'Create new trip',
    icon:<Globe2 className='text-blue-400 h-5 w-5'/>
  },
  {
    title:'Inspire me where to go',
    icon:<Plane className='text-green-500 h-5 w-5'/>
  },
  {
    title:'Discover hidden Gems',
    icon:<Landmark className='text-orange-500 h-5 w-5'/>
  },
  {
    title:'Adventure Destination',
    icon:<Globe2 className='text-yellow-600 h-5 w-5'/>
  }
]

function Hero() {

  const {user}=useUser();
  const router=useRouter();
  const onSend=()=>{
    if(!user){
      router.push('/sign-in')
      return;
    }
    //navigate to create trip planner webpage
    router.push('/create-new-trip')

  }

  return (
    <div className='mt-24 w-full flex justify-center'>

      {/* Content   */}
      <div className='max-w-3xl w-full text-center space-y-6'>
        <h1 className='text-xl md:text-4xl font-bold'>Hey,I am your personal <span className='text-primary'>Trip planner</span>!</h1>
        <p className='text-lg'>Tell me what you want, and I'll handle the rest : Flights, Hotels, Trip planning - all in seconds</p>
      
        {/* InputBox */}
        <div>
          <div className='border rounded-2xl p-4 relative'>
            <Textarea placeholder='Create a trip for Darjeeling from Mumbai' className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none '/>
            <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
              <Send className='h-5 w-5'/>
            </Button>
          </div>
        </div>
        
        {/* Suggestion List */}
        <div className='flex gap-5'>
          {suggestions.map((suggestions,index)=>(
            <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'>
              {suggestions.icon}
              <h2 className='text-sm'>{suggestions.title}</h2>
            </div> 
          ))}
        </div>
        
        
        {/* VideoSection */}


      </div>

      
      

    </div>
  )
}

export default Hero
