import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'

import { fetchSearchSuccess, toggleSearchLoadingStatus, updateSearchQuery } from '@/features/search/store/search-slice'
import { RootState } from '@/store'

import { APP_TITLE, TMDB_API_PREFIX } from '@/utils/settings'

export default function SearchPage() {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery)
  const searchIsLoading = useSelector((state: RootState) => state.search.searchIsLoading)
  const searchResult = useSelector((state: RootState) => state.search.searchResult)
  const searchError = useSelector((state: RootState) => state.search.searchError)

  const pageTitle = searchQuery ? `Searching "${searchQuery}"` : 'Search Movies/TV Shows'

  const fetchSearch = async (query: string) => {
    dispatch(toggleSearchLoadingStatus())

    try { 
      const response = await fetch(
        `${TMDB_API_PREFIX}search/multi?query=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      ).then((res) => res.json())
      dispatch(toggleSearchLoadingStatus())
      dispatch(fetchSearchSuccess(response))
    } catch (error) {
      dispatch(toggleSearchLoadingStatus())
      dispatch(fetchSearchSuccess(error))
    }
  }

  useEffect(() => {
    fetchSearch(searchQuery)
  }, [searchQuery])

  
  return (
    <>
      <Head>
        <title>{pageTitle} | {APP_TITLE}</title>
      </Head>
      
      <h1 className='text-2xl mb-4'>{pageTitle}</h1>
      
      <DebounceInput
        className='p-4 w-full lg:w-1/2 text-black' 
        type='search'
        placeholder='type your query here'
        value={searchQuery} 
        onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
        debounceTimeout={500}
      />

      {
        searchIsLoading 
        ?
          <p>Loading .... </p>
        :
          <p>berenti loading .... </p>
      }

      {
        JSON.stringify(searchResult, null, 2)
      }

      {
        JSON.stringify(searchError, null, 2)
      }

    </>
  )
}
