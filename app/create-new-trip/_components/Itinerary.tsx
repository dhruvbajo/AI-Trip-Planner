import React from 'react'
import { Timeline } from '@/components/ui/timeline'
import { Hotel } from './ChatBox';
import { Clock, Star, Ticket, Timer, Wallet, Calendar, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionCtx } from '../../../convex/_generated/server';
import Link from "next/link"
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';

const TRIP_DATA={
        "destination": "Rishikesh, Uttarakhand, India",
        "duration": "4 days",
        "origin": "Mumbai, Maharashtra, India",
        "budget": "Luxury",
        "group_size": "3 to 5 people",
        "hotels": [
            {
                "hotel_name": "Ananda in the Himalayas",
                "hotel_address": "Village Narendra Nagar, Tehri Garhwal, Rishikesh, Uttarakhand 249175, India",
                "price_per_night": "INR 45000 - 90000",
                "hotel_image_url": "https://www.anandaspa.com/sites/default/files/styles/media_crop/public/2021-06/ananda_in_the_himalayas_-_pool_view_0.jpg",
                "geo_coordinates": {
                    "latitude": 30.1208,
                    "longitude": 78.2536
                },
                "rating": 4.8,
                "description": "A luxury wellness retreat offering Ayurveda, Yoga, and spa experiences amidst serene Himalayan foothills with breathtaking views of the Ganges."
            },
            {
                "hotel_name": "Taj Rishikesh Resort & Spa, Uttarakhand",
                "hotel_address": "Vishwa Heritage Center, New Tehri Rd, Rajpur, Rishikesh, Uttarakhand 249201, India",
                "price_per_night": "INR 15000 - 35000",
                "hotel_image_url": "https://taj.tajhotels.com/content/dam/luxury/taj-rishikesh-resort-and-spa/our-resort/taj-rishikesh-resort-and-spa-exterior_1600x900.jpg",
                "geo_coordinates": {
                    "latitude": 30.0967,
                    "longitude": 78.2755
                },
                "rating": 4.6,
                "description": "Blend of luxury and nature offering stunning views of the Ganges, with spacious rooms, excellent dining, and wellness spa facilities."
            },
            {
                "hotel_name": "EllBee Ganga View",
                "hotel_address": "Near Laxman Jhula, Tapovan, Rishikesh, Uttarakhand 249201, India",
                "price_per_night": "INR 8000 - 18000",
                "hotel_image_url": "https://media.tcsworldtravel.com/article/2020/01/02/pbh6mg4gzjwmrf0djnh1u7n2r2/image/1200x675/0a4316d8-3e62-4fff-bb83-5a08c58ecf07.jpg",
                "geo_coordinates": {
                    "latitude": 30.1143,
                    "longitude": 78.267
                },
                "rating": 4.3,
                "description": "Luxury hotel with river-facing rooms, rooftop restaurant, and easy access to major attractions like Laxman Jhula."
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "day_plan": "Arrival and Leisure",
                "best_time_to_visit_day": "Morning to evening",
                "activities": [
                    {
                        "place_name": "Arrival at Rishikesh",
                        "place_details": "Reach Rishikesh by flight/train or private car from Mumbai. Check into your luxury hotel and relax.",
                        "place_image_url": "https://cdn.britannica.com/44/122044-050-1F9A422A/Rishikesh-Ganges-River-Uttarakhand-India.jpg",
                        "geo_coordinates": {
                            "latitude": 30.0869,
                            "longitude": 78.2676
                        },
                        "place_address": "Rishikesh, Uttarakhand, India",
                        "ticket_pricing": "N/A",
                        "time_travel_each_location": "Approx 1.5 hour flight or 6-8 hour drive",
                        "best_time_to_visit": "Morning"
                    },
                    {
                        "place_name": "Evening Ganga Aarti at Triveni Ghat",
                        "place_details": "Experience the spiritual energy during the Ganga Aarti ceremony on the banks of the holy river.",
                        "place_image_url": "https://images.unsplash.com/photo-1541872703-953a5311f1ea",
                        "geo_coordinates": {
                            "latitude": 30.0952,
                            "longitude": 78.2631
                        },
                        "place_address": "Triveni Ghat, Rishikesh, Uttarakhand 249201",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "15 mins from most hotels",
                        "best_time_to_visit": "6:00 PM to 7:30 PM"
                    }
                ]
            },
            {
                "day": 2,
                "day_plan": "Adventure and Spiritual Exploration",
                "best_time_to_visit_day": "Morning to evening",
                "activities": [
                    {
                        "place_name": "White Water Rafting on Ganges",
                        "place_details": "Enjoy exhilarating white water rafting on the Ganges, suitable for families with safety arrangements in place.",
                        "place_image_url": "https://media.timeout.com/images/105382844/750/422/image.jpg",
                        "geo_coordinates": {
                            "latitude": 30.1055,
                            "longitude": 78.2734
                        },
                        "place_address": "Ganges River, Rishikesh, Uttarakhand",
                        "ticket_pricing": "INR 1500 to INR 3000 per person",
                        "time_travel_each_location": "Starts early morning, approx 2-3 hours activity",
                        "best_time_to_visit": "8:00 AM to 11:30 AM"
                    },
                    {
                        "place_name": "Visit to Beatles Ashram (Chaurasi Kutia)",
                        "place_details": "Explore the historic Maharishi Mahesh Yogi Ashram, known for its tranquility and incredible graffiti art.",
                        "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Beatles_Ashram_Entrance.jpg",
                        "geo_coordinates": {
                            "latitude": 30.1195,
                            "longitude": 78.2533
                        },
                        "place_address": "Rajaji National Park, Rishikesh, Uttarakhand 249201",
                        "ticket_pricing": "INR 100 - 200",
                        "time_travel_each_location": "20 minutes from city center",
                        "best_time_to_visit": "12:00 PM to 3:00 PM"
                    },
                    {
                        "place_name": "Evening Yoga Session by the Ganges",
                        "place_details": "Participate in a luxury private yoga session or meditation by the river, arranged by your hotel or local expert.",
                        "place_image_url": "https://www.theurbandeveloper.com/sites/default/files/styles/blog-image/public/2020-10/yoga-956011_1920.jpg",
                        "geo_coordinates": {
                            "latitude": 30.099,
                            "longitude": 78.2657
                        },
                        "place_address": "Near Laxman Jhula, Rishikesh",
                        "ticket_pricing": "INR 2500+ (private session)",
                        "time_travel_each_location": "Evening, approx 1-1.5 hours",
                        "best_time_to_visit": "5:30 PM to 7:00 PM"
                    }
                ]
            },
            {
                "day": 3,
                "day_plan": "Cultural and Natural Exploration",
                "best_time_to_visit_day": "Morning to late afternoon",
                "activities": [
                    {
                        "place_name": "Laxman Jhula and Ram Jhula",
                        "place_details": "Visit two iconic suspension bridges over the Ganges, explore nearby temples, cafes, and local shops.",
                        "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Laxman_Jhula_Rishikesh.jpg",
                        "geo_coordinates": {
                            "latitude": 30.1151,
                            "longitude": 78.2679
                        },
                        "place_address": "Rishikesh, Uttarakhand 249201",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "Central locations, walking distance between two",
                        "best_time_to_visit": "8:00 AM to 11:00 AM"
                    },
                    {
                        "place_name": "Neer Garh Waterfall Trek",
                        "place_details": "A light trek suitable for families leading to peaceful waterfalls and natural pools perfect for a refreshing dip.",
                        "place_image_url": "https://cdn.tmbi.com/media/recipe/featured/2019/3/12/1200x1200/Neer-Falls-Rishikesh-Easy-Trek.jpg",
                        "geo_coordinates": {
                            "latitude": 30.11,
                            "longitude": 78.2805
                        },
                        "place_address": "Near Laxman Jhula, Rishikesh",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "Trek approx 45 mins to 1 hour",
                        "best_time_to_visit": "11:30 AM to 2:00 PM"
                    },
                    {
                        "place_name": "Visit Parmarth Niketan Ashram",
                        "place_details": "One of the largest ashrams in Rishikesh, known for spiritual classes, gardens, and evening aarti.",
                        "place_image_url": "https://parmarth.org/wp-content/uploads/2020/03/ashram-heaven-Parmarth.jpg",
                        "geo_coordinates": {
                            "latitude": 30.1087,
                            "longitude": 78.2691
                        },
                        "place_address": "Shivanand Marg, Rishikesh, Uttarakhand 249201",
                        "ticket_pricing": "Free entry; Donations optional",
                        "time_travel_each_location": "15 mins from Neer Garh Waterfall",
                        "best_time_to_visit": "Late afternoon, 3:00 PM to 5:30 PM"
                    }
                ]
            },
            {
                "day": 4,
                "day_plan": "Relaxation and Departure",
                "best_time_to_visit_day": "Morning to early afternoon",
                "activities": [
                    {
                        "place_name": "Spa and Wellness at Hotel",
                        "place_details": "Book a luxurious spa treatment, yoga, or meditation session at your hotel to rejuvenate before departure.",
                        "place_image_url": "https://www.anandaspa.com/sites/default/files/styles/media_crop/public/2019-05/spa-center-02.jpg",
                        "geo_coordinates": {
                            "latitude": 30.1208,
                            "longitude": 78.2536
                        },
                        "place_address": "Hotel premises",
                        "ticket_pricing": "Depending on package chosen, approx INR 5000+",
                        "time_travel_each_location": "Dependent on hotel",
                        "best_time_to_visit": "Morning"
                    },
                    {
                        "place_name": "Departure to Mumbai",
                        "place_details": "Check out from hotel and proceed to airport/railway station for your journey back to Mumbai.",
                        "place_image_url": "https://cdn-icons-png.flaticon.com/512/10469/10469587.png",
                        "geo_coordinates": {
                            "latitude": 30.0869,
                            "longitude": 78.2676
                        },
                        "place_address": "Rishikesh Airport or Rishikesh Railway Station",
                        "ticket_pricing": "N/A",
                        "time_travel_each_location": "Travel time depends on mode: approx 1.5 hr flight + transfer or 6-8 hrs road",
                        "best_time_to_visit": "Afternoon"
                    }
                ]
            }
        ]
}

const Itinerary = () => {
  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {TRIP_DATA?.hotels.map((hotel:Hotel,index)=>(
            <HotelCardItem hotel={hotel}/>
          ))}  
        </div>
      ),
    },
    ...TRIP_DATA.itinerary.map((dayData)=>({
        title:`Day ${dayData?.day}`,
        content:(
            <div>
                <p>Best Time :{dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {dayData?.activities.map((activity,index)=>(
                        <PlaceCardItem activity={activity}/>
                    ))}
                </div>
            </div>
        )
    }))
  ];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      <Timeline data={data} tripData={TRIP_DATA} />
    </div>
  );
}


export default Itinerary


