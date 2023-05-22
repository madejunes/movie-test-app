import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import { APP_TITLE, TMDB_API_PREFIX } from '@/utils/settings'
import formatPosterUrl from '@/utils/format-poster-url'

type DetailPageProps = {
  data: {
    title: string
    name: string
    backdrop_path: string
    poster_path: string
    overview: string
    homepage: string
  }
}

export default function DetailPage({ data }: DetailPageProps) {
  const { title, name, backdrop_path, poster_path, overview, homepage } = data
  return (
    <>
      <Head>
        <title>
          {' '}
          {title || name} | {APP_TITLE}
        </title>
      </Head>
      <div className="relative overflow-hidden">
        {backdrop_path ? (
          <Image
            src={formatPosterUrl(backdrop_path, 'w780')}
            alt={title}
            width={780}
            height={439}
            className="lg:absolute lg:right-0 lg:top-0 mb-4"
          />
        ) : (
          <Image
            src={formatPosterUrl(poster_path)}
            alt={title}
            width={342}
            height={513}
            className="lg:absolute lg:right-0 lg:top-0 mb-4"
          />
        )}
        <div className="relative lg:min-h-[439px] flex items-center bg-gradient-to-r from-slate-950 to-slate-400/10">
          <div className="lg:w-[50%] lg:pl-10">
            <h1 className="text-2xl font-bold mb-4">{title || name}</h1>
            <p className="mb-4">{overview}</p>
            <p>
              Official Website:{' '}
              <Link href={homepage} className="hover:underline">
                {homepage}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const splittedParam = context.params?.id?.split('-')
  const contentType = splittedParam?.[0]
  const contentId = splittedParam?.[1]

  const contentData = await fetch(
    `${TMDB_API_PREFIX}${contentType}/${contentId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json())

  return {
    props: {
      data: contentData,
    },
  }
}
