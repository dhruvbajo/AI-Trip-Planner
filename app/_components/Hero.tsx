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
  const [query, setQuery] = React.useState("");

  const onSend=()=>{
    if(!user){
      router.push('/sign-in')
      return;
    }
    //navigate to create trip planner webpage
    // router.push('/create-new-trip')
    if (!query.trim()) return;
    
    router.push(`/create-new-trip?query=${encodeURIComponent(query)}`)

  }

  return (
  <div className="relative mt-28 w-full flex justify-center px-6">

    {/* Background Glow */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div className="w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"></div>
    </div>

    {/* Content */}
    <div className="max-w-3xl w-full text-center space-y-10">

      {/* Heading */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Hey, I am your personal{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Trip Planner
          </span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Tell me what you want and I’ll handle everything — Flights, Hotels,
          complete trip planning — all in seconds.
        </p>
      </div>

      {/* Input Box */}
      <div className="relative group">
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-5 shadow-xl transition-all duration-300 group-hover:shadow-2xl">
{/* 
          <Textarea
            placeholder="Create a trip for Darjeeling from Mumbai"
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
          /> */}
          <Textarea
            placeholder="Create a trip for Darjeeling from Mumbai"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
          />


          <Button
            size="icon"
            className="absolute bottom-7 right-7 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
            onClick={() => onSend()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white shadow-sm"
          >
            {item.icon}
            <h2 className="text-sm font-medium">{item.title}</h2>
          </div>
        ))}
      </div>

    </div>
  </div>
)

}

export default Hero
