import Head from 'next/head'
import Link from 'next/link'

import { MovieApiResponse } from '@/features/movie/movie'
import { TvApiResponse } from '@/features/tv/tv'

import ItemList from '@/features/shared/components/ItemList'

import { APP_TITLE, TMDB_API_PREFIX } from '@/utils/settings'

type HomeProps = {
  nowPlayingMovies: MovieApiResponse
  airingTodayTv: TvApiResponse
}

export default function Home({ nowPlayingMovies, airingTodayTv }: HomeProps) {
  const movies = nowPlayingMovies?.results.slice(0, 4)
  const tvSeries = airingTodayTv?.results.slice(0, 4)
  movies.forEach((movie) => (movie.contentType = 'movie'))
  tvSeries.forEach((movie) => (movie.contentType = 'tv'))

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <main>
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl">Now Playing Movies</h2>
          <Link className="hover:underline" href="/movie">
            See More
          </Link>
        </div>
        <ItemList items={movies} />

        <div className="flex justify-between mb-2">
          <h2 className="text-2xl">Airing Today TV Series</h2>
          <Link className="hover:underline" href="/tv">
            See More
          </Link>
        </div>
        <ItemList items={tvSeries} />
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const nowPlayingMovieRequest = fetch(
    `${TMDB_API_PREFIX}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const airingTodayTvRequest = fetch(
    `${TMDB_API_PREFIX}tv/airing_today?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const [nowPlayingMovies, airingTodayTv] = await Promise.all([
    nowPlayingMovieRequest,
    airingTodayTvRequest,
  ])

  return {
    props: {
      nowPlayingMovies,
      airingTodayTv,
    },
  }
}
