import { APP_TITLE } from '@/utils/settings'
import Head from 'next/head'

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Search | {APP_TITLE}</title>
      </Head>
      <h1>Search</h1>
      <p>Search page ini</p>
    </>
  )
}
