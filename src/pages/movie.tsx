import { APP_TITLE } from '@/utils/settings'
import Head from 'next/head'

export default function MoviePage() {
  return (
    <>
      <Head>
        <title>Movie | {APP_TITLE}</title>
      </Head>
      <h1>Movie</h1>
      <p>movie page ini</p>
    </>
  )
}
