import Link from 'next/link'
import Image from 'next/image'

import formatPosterUrl from '@/utils/format-poster-url'
import formatSlug from '@/utils/format-slug'
import { Item } from '../types/item'

type ItemCardProps = {
  item: Item
}
const ItemCardLong = ({ item }: ItemCardProps) => {
  const title = item.title || item.name
  return (
    <div>
      <Link
        className="group flex mb-4"
        href={`/detail/${formatSlug(
          `${item.media_type}-${item.id}-${title}`
        )}`}
      >
        <Image
          src={formatPosterUrl(item.poster_path, 'w342')}
          alt={title}
          width={154}
          height={278}
          className="group-hover:scale-105 transition-all"
        />
        <div className='ml-8'>
          <h2 className="font-bold">{title}</h2>
          <p>{item.overview}</p>
        </div>
      </Link>
    </div>
  )
}

export default ItemCardLong
