import Banner from "../components/Banner";
import MoviesGallery from "../components/MoviesGalery";
import Navbar from "../components/Navbar";
import IMovie from "../interfaces/IMovie";


interface HomeProps {
  trendsMovies: Array<IMovie>,
  topRatedMovies: Array<IMovie>,
  actionsMovies: Array<IMovie>,
  adventuresMovies: Array<IMovie>,
  documentaryMovies: Array<IMovie>,
  scienceFictionMovies: Array<IMovie>

}

export default function Home({ trendsMovies, topRatedMovies, actionsMovies, adventuresMovies, documentaryMovies, scienceFictionMovies }: HomeProps) {
  return (
    <>
      <Navbar />
      <Banner trends={trendsMovies} />
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        <MoviesGallery movies={topRatedMovies} title="Em alta" />
        <MoviesGallery movies={actionsMovies} title="Ação" />
        <MoviesGallery movies={adventuresMovies} title="Aventura" />
        <MoviesGallery movies={documentaryMovies} title="Documentário" />
        <MoviesGallery movies={scienceFictionMovies} title="Ficção cientifica" />
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  // const res = await fetch(
  //   `${process.env.API_BASE_URL}/movie/popular?language=pt&page=1`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
  //     },
  //   }
  // );

  // const data = await res.json();

  // return {
  //   props: {
  //     topRated: data.total_pages
  //   }
  // }


  const [
    trendsMoviesRes,
    topRatedMoviesRes,
    actionsMoviesRes,
    adventuresMoviesRes,
    documentaryMoviesRes,
    scienceFictionMoviesRes
  ] = await Promise.all([
    fetch(
      `${process.env.API_BASE_URL}/trending/movie/day?language=pt`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
    fetch(
      `${process.env.API_BASE_URL}/movie/top_rated?language=pt&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
    fetch(
      `${process.env.API_BASE_URL}/discover/movie?with_genres=28&language=pt&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
    fetch(
      `${process.env.API_BASE_URL}/discover/movie?with_genres=12&language=pt&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
    fetch(
      `${process.env.API_BASE_URL}/discover/movie?with_genres=99&language=pt&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
    fetch(
      `${process.env.API_BASE_URL}/discover/movie?with_genres=878&language=pt&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
        },
      }
    ),
  ]);

  const [trendsMovies, topRatedMovies, actionsMovies, adventuresMovies, documentaryMovies, scienceFictionMovies] =
    await Promise.all([
      trendsMoviesRes.json(),
      topRatedMoviesRes.json(),
      actionsMoviesRes.json(),
      adventuresMoviesRes.json(),
      documentaryMoviesRes.json(),
      scienceFictionMoviesRes.json(),
    ]);

  return {
    props: {
      trendsMovies: trendsMovies.results,
      topRatedMovies: topRatedMovies.results,
      actionsMovies: actionsMovies.results,
      adventuresMovies: adventuresMovies.results,
      documentaryMovies: documentaryMovies.results,
      scienceFictionMovies: scienceFictionMovies.results,
    },
  };

}