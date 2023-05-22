import Link from 'next/link'
import Image from 'next/image'

import formatPosterUrl from '@/utils/format-poster-url'
import formatSlug from '@/utils/format-slug'
import { Item } from '../types/item'

type ItemCardProps = {
  item: Item
}
const ItemCard = ({ item }: ItemCardProps) => {
  const title = item.title || item.name
  return (
    <div className="overflow-hidden">
      <Link
        className="relative group"
        href={`/detail/${formatSlug(
          `${item.contentType}-${item.id}-${title}`
        )}`}
      >
        <Image
          src={formatPosterUrl(item.poster_path)}
          alt={title}
          width={342}
          height={513}
          className="group-hover:scale-105 transition-all"
        />
        <h2 className="absolute left-0 right-0 bottom-0 bg-slate-500/50 h-1/5 px-3 py-2 font-bold flex items-center justify-center text-center">
          {title}
        </h2>
      </Link>
    </div>
  )
}

export default ItemCard