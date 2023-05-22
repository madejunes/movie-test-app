import Head from 'next/head'

import ItemList from '@/features/shared/components/ItemList'

import { APP_TITLE, TMDB_API_PREFIX } from '@/utils/settings'
import { TvApiResponse } from '@/features/tv/tv'

type MoviePageProps = {
  topRatedTv: TvApiResponse,
  popularTv: TvApiResponse
}

export default function MoviePage({topRatedTv, popularTv}: MoviePageProps) {
  const topRated = topRatedTv.results
  const popular = popularTv.results
  topRated.forEach((tv) => (tv.contentType = 'tv'))
  popular.forEach((tv) => (tv.contentType = 'tv'))

  return (
    <>
      <Head>
        <title>Movie | {APP_TITLE}</title>
      </Head>
      <main>
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl">Top Rated TV Series</h2>
        </div>
        <ItemList items={topRated} />

        <div className="flex justify-between mb-2">
          <h2 className="text-2xl">Popular TV Series</h2>
        </div>
        <ItemList items={popular} />
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const topRatedTvRequest = fetch(
    `${TMDB_API_PREFIX}tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const popularTvRequest = fetch(
    `${TMDB_API_PREFIX}tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  const [topRatedTv, popularTv] = await Promise.all([
    topRatedTvRequest,
    popularTvRequest
  ])

  return {
    props: {
      topRatedTv,
      popularTv
    },
  }
}
