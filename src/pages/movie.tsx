import { APP_TITLE } from '@/utils/settings'
import Head from 'next/head'

export default function MoviePage() {
  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <h1>Movie | {APP_TITLE}</h1>
      <p>movie page ini</p>
    </>
  )
}
