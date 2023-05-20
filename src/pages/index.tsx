import Head from 'next/head'

import { MovieApiResponse } from '@/features/movie/movie'
import { TvApiResponse } from '@/features/tv/tv'

import MovieCard from '@/features/movie/components/MovieCard'
import TvCard from '@/features/tv/components/TvCard'
import { APP_TITLE } from '@/utils/settings'

type HomeProps = {
  nowPlayingMovies: MovieApiResponse
  airingTodayTv: TvApiResponse
}

export default function Home({ nowPlayingMovies, airingTodayTv }: HomeProps) {
  const movies = nowPlayingMovies?.results.slice(0, 5)
  const tvSeries = airingTodayTv?.results.slice(0, 5)
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <main>
        <h2>Now Playing Movies</h2>
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>

        <h2>Airing Today TV Series</h2>
        <div className="flex">
          {tvSeries.map((tv) => (
            <TvCard key={tv.id} data={tv} />
          ))}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const nowPlayingMovieResponse = fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const airingTodayTvResponse = fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const [nowPlayingMovies, airingTodayTv] = await Promise.all([
    nowPlayingMovieResponse,
    airingTodayTvResponse,
  ])

  return {
    props: {
      nowPlayingMovies,
      airingTodayTv,
    },
  }
}
