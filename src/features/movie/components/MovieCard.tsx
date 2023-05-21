import Image from 'next/image'
import Link from 'next/link'

import { Movie } from '../movie'
import formatPosterUrl from '@/utils/format-poster-url'
import formatSlug from '@/utils/format-slug'

type MovieCardProps = {
  data: Movie
}

export default function MovieCard({ data }: MovieCardProps) {
  return (
    <div className='overflow-hidden'>
      <Link className='relative group' href={`/detail/${formatSlug(`movie-${data.id}-${data.title}`)}`}>
        <Image
          src={formatPosterUrl(data.poster_path)}
          alt={data.title}
          width={342}
          height={513}
          className='group-hover:scale-105 transition-all'
        />
        <h2 className='absolute left-0 right-0 bottom-0 bg-slate-500/50 h-1/5 px-3 py-2 font-bold flex items-center justify-center text-center'>{data.title}</h2>
      </Link>
    </div>
  )
}
