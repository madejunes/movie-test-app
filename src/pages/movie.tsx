import Head from 'next/head'

import ItemList from '@/features/shared/components/ItemList'

import { APP_TITLE, TMDB_API_PREFIX } from '@/utils/settings'
import { MovieApiResponse } from '@/features/movie/movie'

type MoviePageProps = {
  topRatedMovies: MovieApiResponse,
  upcomingMovies: MovieApiResponse
}

export default function MoviePage({topRatedMovies, upcomingMovies}: MoviePageProps) {
  const topRated = topRatedMovies?.results
  const upcoming = upcomingMovies?.results
  topRated.forEach((movie) => (movie.contentType = 'movie'))
  upcoming.forEach((movie) => (movie.contentType = 'movie'))

  return (
    <>
      <Head>
        <title>{`Movie | ${APP_TITLE}`}</title>
      </Head>
      <main>
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl">Top Rated Movies</h2>
        </div>
        <ItemList items={topRated} />

        <div className="flex justify-between mb-2">
          <h2 className="text-2xl">Upcoming Movies</h2>
        </div>
        <ItemList items={upcoming} />
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const topRatedMovieRequest = fetch(
    `${TMDB_API_PREFIX}movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const upcomingMovieRequest = fetch(
    `${TMDB_API_PREFIX}movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const [topRatedMovies, upcomingMovies] = await Promise.all([
    topRatedMovieRequest,
    upcomingMovieRequest
  ])

  return {
    props: {
      topRatedMovies,
      upcomingMovies
    },
  }
}
