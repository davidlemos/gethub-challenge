import { ChangeEvent, ReactEventHandler, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import IMovie from '../../interfaces/IMovie';
import Image from "next/image";
import moment from 'moment';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useDebounce } from 'usehooks-ts'

import NotFoundMovies from '../../assets/not-found-movie.png';
import SearchMovies from '../../assets/search-movies.png';

import {
  PlusCircleIcon,
} from '@heroicons/react/24/solid'
import Navbar from '../../components/Navbar';
import { color } from '@mui/system';


interface IProps {
  movies: Array<IMovie>,
  totalPages: number,
  totalResults: number,
  page: number,
}

function fixedEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResult, setTotalResults] = useState("");
  const [totalResultPages, setTotalPages] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<IMovie>>([]);

  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingDone, setIsSearchingDone] = useState(false);
  const [resultForTerm, setResultForTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    search();
  }, [debouncedSearchTerm])

  const search = async () => {

    if (searchTerm) {
      const searchEncoded = fixedEncodeURIComponent(searchTerm);
      setIsSearching(true);
      setIsSearchingDone(false);
      const [
        moviesRes,
      ] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?page=${page}&language=pt&query=${searchEncoded}&api_key=c9fd0a96c179e61f3a8c586e124b8a47`,
        ),
      ]);
      const [result] =
        await Promise.all([
          moviesRes.json(),
        ]);

      setMovies(result.results);
      setIsSearchingDone(true);
      setTotalPages(result.total_pages);
      setTotalResults(result.total_results);
      setIsSearching(false);
      setResultForTerm(searchTerm);
    }

  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center'>
        <TextField
          className="w-full sm:w-2/3 mx-auto p-4"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchTerm(e.target.value)}
          InputProps={{
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "Encontre novos filmes"
          }

          }
        />
      </div>

      {
        isSearching ?
          <div className='flex items-center justify-center w-full h-28'>
            <CircularProgress style={{ color: "#1976d2" }} />
          </div>
          :
          (!movies || movies.length === 0) ?
            searchTerm !== "" && isSearchingDone ?
              <div className='flex flex-col justify-center items-center w-full h-full p-2 mt-6'>
                <Image src={NotFoundMovies} height={219} width={158} alt="Nenhum filme encontrado" />
                <h2 className='text-white mt-3 text-xl text-center'>Não encontramos resultados para "{resultForTerm}".</h2>

              </div>
              :
              <div className='flex flex-col justify-center items-center w-full h-full p-2 mt-6'>
                <Image src={SearchMovies} height={219} width={158} alt="Nenhum filme encontrado" />
                <h2 className='text-white mt-3 text-xl text-center'>Encontre novos filmes.</h2>

              </div>
            :
            <div className="grid grid-cols-4 gap-4 p-4">
              {

                movies.map(movie =>
                  <div
                    className='p-2 flex flex-row items-center'
                  >
                    <Image
                      src={
                        `${process.env.NEXT_PUBLIC_URL_IMAGE}${movie.poster_path}`
                      }
                      width={150}
                      height={250}
                      objectFit="cover"
                      className="rounded-lg mx-auto"
                      quality={80}
                    />
                    <div className='flex ml-2 flex-col items-start'>
                      <h2 className='text-white font-semibold text-lg mb-1 mt-2 uppercase leading-4'>{movie.title}</h2>
                      <p>
                        {
                          movie.release_date ?
                            <span className="text-xs text-white p-1 rounded-sm bg-slate-500 w-full">{moment(movie.release_date).format('YYYY')}</span>
                            : <span className='h-6 w-full'></span>
                        }
                      </p>
                      <Button size="small" startIcon={<PlusCircleIcon className="h-4" />} variant="contained"
                        className="mt-3 bg-red-700"
                        onClick={() => router.push(`/movie/${movie.id}`)}>
                        Info
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>

      }

    </>
  )
}



// export const getServerSideProps: GetServerSideProps = async (context) => {

//   // const query  = fixedEncodeURIComponent(context.query.query?.toString() || '');
//   const { query } = context.query;

//   const [
//     moviesRes,
//   ] = await Promise.all([
//     fetch(
//       `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false&language=pt&query=${query}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
//         },
//       }
//     ),
//   ]);

//   const [movies] =
//     await Promise.all([
//       moviesRes.json(),
//     ]);

//   return {
//     props: {
//       movies: movies.results,
//       page: movies.page,
//       totalPages: movies.total_pages,
//       totalResults: movies.total_results
//     },
//   };
// }