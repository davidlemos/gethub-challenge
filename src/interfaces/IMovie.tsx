import Genres from "./IGenres"

export default interface IMovie{
    id: number,
    adult: boolean,
    backdrop_path: string,
    original_title: string,
    overview: string,
    poster_path: string,
    title: string,
    genres: Array<Genres>,
    release_date: string,
    runtime: number
}