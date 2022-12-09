import Image from "next/image";
import { useRouter } from "next/router";
import IMovie from "../interfaces/IMovie";

interface IProps {
  movie: IMovie
}

function MovieThumbnail({ movie }: IProps) {
  const router = useRouter();

  return (
    <div
      className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 mb-2"
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        src={
          `${process.env.NEXT_PUBLIC_URL_IMAGE}${movie.backdrop_path || movie.poster_path}` ||
          `${process.env.NEXT_PUBLIC_URL_IMAGE}${movie.poster_path}`
        }
        width={330}
        height={210}
        objectFit="cover"
        className="rounded-lg"
        quality={80}
      />
    </div>
  );
}

export default MovieThumbnail;