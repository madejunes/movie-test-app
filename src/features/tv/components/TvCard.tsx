import Image from 'next/image'
import { Tv } from '../tv'
import formatPosterUrl from '@/utils/format-poster-url'

type TvCardProps = {
  data: Tv
}

export default function MovieCard({ data }: TvCardProps) {
  return (
    <div>
      <Image
        src={formatPosterUrl(data.poster_path)}
        alt={data.name}
        width={342}
        height={513}
      />
      <h2>{data.name}</h2>
    </div>
  )
}
