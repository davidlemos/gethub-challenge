import { GetServerSideProps } from 'next'
import Head from 'next/head';
import moment from 'moment';


import Image from "next/image";
import IGenres from '../../interfaces/IGenres';

import IMovie from "../../interfaces/IMovie"
import MoviesGallery from '../../components/MoviesGalery';

interface IProps {
  movie: IMovie,
  similarMovies: Array<IMovie>
}

export default function Movie({movie, similarMovies}: IProps) {


  return (
    <div className="relative">
      <Head>
        <title>{movie.title}</title>
      </Head>
      <section className="relative z-50">
        <div className="relative min-h-[calc(100vh-72px)]">
          <Image
            src={
              `${process.env.NEXT_PUBLIC_URL_IMAGE}${movie.backdrop_path || movie.poster_path}`
            }
            layout="fill"
            objectFit="cover"
            className="blur-sm"
          />
          <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-40"></div>
        </div>
        <div className="absolute h-full inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
          <div className='flex flex-row items-center justify-center h-full'>

            <div className="w-xs sm:mr-10">

              <Image
                src={`${process.env.NEXT_PUBLIC_URL_IMAGE}${movie.poster_path}`}
                width={200}
                height={300}
                className="rounded-md drop-shadow-md"
              />
            </div>
            <div className="w-2/3">


              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {movie.title || movie.original_title}
              </h1>

              <p className="text-xs md:text-sm text-white">
                <span className='mr-2'>{moment(movie.release_date).format('YYYY')}</span> •{" "}
                <span className='mx-2'>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span> •{" "}
                {movie.genres.map((genre: IGenres) =>   <span className='mx-2'>{genre.name}</span>)}{" "}
              </p>
              <h4 className="text-sm md:text-lg max-w-4xl text-white mt-6">{movie.overview}</h4>
          </div>
          </div>
        </div>
      </section>
      <section className="relative z-50" style={{marginTop: -150}}>
        <MoviesGallery movies={similarMovies} title="Relacionados" />
      </section>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id } = context.query;

  const [
    movieRes,
    similarMoviesRes
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?&language=pt&append_to_response=videos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=pt&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    )
  ]);

  const [movie, similarMovies] =
    await Promise.all([
      movieRes.json(),
      similarMoviesRes.json(),      
    ]);

  return {
    props: {
      movie,
      similarMovies: similarMovies.results,

    },
  };
}