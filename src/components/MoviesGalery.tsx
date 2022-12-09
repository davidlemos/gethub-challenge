import IMovie from "../interfaces/IMovie";
import MovieThumbnail from "./MovieThumbnail";

interface IProps {
  movies: Array<IMovie>,
  title: string
}

function MoviesGallery({ movies, title }: IProps) {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold text-white uppercase">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900">
        {movies.map((movie) => (
          <MovieThumbnail key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesGallery;