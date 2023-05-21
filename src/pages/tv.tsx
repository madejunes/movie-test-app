import { APP_TITLE } from '@/utils/settings'
import Head from 'next/head'

export default function TvPage() {
  return (
    <>
      <Head>
        <title>TV | {APP_TITLE}</title>
      </Head>
      <h1>Tv</h1>
      <p>tv page ini</p>
    </>
  )
}
