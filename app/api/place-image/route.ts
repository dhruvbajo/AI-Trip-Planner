import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { placeName } = await req.json();

    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: placeName + " hotel",
          per_page: 1
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    const image = res.data.results?.[0]?.urls?.regular;

    return NextResponse.json({ image });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ image: null });
  }
}
