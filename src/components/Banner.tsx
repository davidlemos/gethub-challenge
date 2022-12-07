import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import IMovie from "../interfaces/IMovie";
import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from "@mui/material";

import truncate from '../utils/truncate';
import { Add } from "@mui/icons-material";

interface IProps {
  trends: Array<IMovie>
}

export default function Banner({ trends }: IProps) {
  const router = useRouter();


  return (
    <section className="relative w-full mx-auto">

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        showArrows={true}
        interval={5000}
      >
        {
          trends.map(trend =>
            <div>

              <div className="relative min-h-[calc(100vh-72px)]">
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_URL_IMAGE}${trend.backdrop_path || trend.poster_path}`
                  }
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
              </div>
              <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12  z-50 w-2/3 text-left">
                <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold text-white mb-8">
                  {trend.title || trend.original_title}
                </h1>                
                <h4 className="text-sm md:text-base max-w-4xl text-white mb-4 font-extralight">
                  {truncate(trend.overview, 200)}
                </h4>
                <Button size="small" startIcon={<Add />} variant="contained"
                className="mb-28"
                onClick={() => router.push(`/movie/${trend.id}`)}>
                  Info
                </Button>
              </div>
            </div>
          )
        }
      </Carousel>
    </section>
  )
}