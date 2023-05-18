import Image from 'next/image'
import { Movie } from "../movie"
import formatPosterUrl from '@/utils/format-poster-url'

type MovieCardProps = {
  data: Movie
}

export default function MovieCard ({data}: MovieCardProps) {
  return (
    <div>
      <Image
        src={formatPosterUrl(data.poster_path)}
        alt={data.title}
        width={342}
        height={513}
      />
      <h2>{data.title}</h2>
    </div>
  )
}