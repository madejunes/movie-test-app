import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'

import { APP_TITLE, TMDB_API_PREFIX } from '@/utils/settings'
import { Item } from '@/features/shared/types/item'
import ItemCardLong from '@/features/shared/components/ItemCardLong'

type FetchSearchResult = {
  results: Item[]
  total_results: number
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<FetchSearchResult>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const pageTitle = searchQuery
    ? `Searching "${searchQuery}"`
    : 'Search Movies/TV Shows'

  const fetchSearch = async (query: string) => {
    setIsLoading(true)
    setError('')

    try {
      const movieSearchReq = fetch(
        `${TMDB_API_PREFIX}search/movie?query=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      ).then((res) => res.json()).then((data) => data as FetchSearchResult)
      const tvSearchReq = fetch(
        `${TMDB_API_PREFIX}search/tv?query=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      ).then((res) => res.json()).then((data) => data as FetchSearchResult)

      const [movieSearchRes, tvSearchRes] = await Promise.all([
        movieSearchReq,
        tvSearchReq,
      ])

      const combineResult: FetchSearchResult = {
        results: movieSearchRes.results.concat(tvSearchRes.results),
        total_results: movieSearchRes.total_results + tvSearchRes.total_results
      }
     
      setIsLoading(false)
      setSearchResult(combineResult)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      setError('Some Error Happens!')
    }
  }

  useEffect(() => {
    fetchSearch(searchQuery)
  }, [searchQuery])

  return (
    <>
      <Head>
        <title>{`${pageTitle} | ${APP_TITLE}`}</title>
      </Head>

      <h1 className="text-2xl mb-4">{pageTitle}</h1>

      <DebounceInput
        className="p-4 w-full lg:w-1/2 text-black mb-8"
        type="search"
        placeholder="type your query here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        debounceTimeout={500}
      />

      {isLoading ? (
        <p>Loading .... </p>
      ) : (
        <>
          <div>{error}</div>
          <div>
            {
              searchResult?.total_results === 0 && searchQuery !== '' ?
              <p>Seems Like no result, try again</p>
              :
              searchResult?.results.map((item: Item) => (
                <ItemCardLong key={item.id} item={item} />
              ))
            }
          </div>
        </>
      )}
    </>
  )
}
