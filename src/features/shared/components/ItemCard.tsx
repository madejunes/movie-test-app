import Link from 'next/link'
import Image from 'next/image'

import formatPosterUrl from '@/utils/format-poster-url'
import formatSlug from '@/utils/format-slug'
import { Item } from '../types/item'
import { useDispatch } from 'react-redux'
import { addFavorites, removeFvorites } from '@/features/favorites/store/fav-slice'
import { useRouter } from 'next/router'

type ItemCardProps = {
  item: Item
}
const ItemCard = ({ item }: ItemCardProps) => {
  const title = item.title || item.name
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <div className="overflow-hidden relative">
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

      {router.asPath === '/fav' ? 
      <span className='absolute left-2 top-2 h-10 w-10 cursor-pointer' title='Remove Favorites' onClick={() => dispatch(removeFvorites(item))} >
        <svg className='fill-lime-500 hover:fill-red-500 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.09 36.09"><path d="M36.042 13.909a1.006 1.006 0 0 0-.85-.688l-11.549-1.172L18.96 1.43a1 1 0 0 0-1.83.002L12.446 12.05.899 13.221a1.003 1.003 0 0 0-.565 1.743l8.652 7.738-2.453 11.343a1 1 0 0 0 1.481 1.074l10.032-5.84 10.03 5.84a.997.997 0 0 0 1.091-.059 1 1 0 0 0 .391-1.02l-2.453-11.344 8.653-7.737a.992.992 0 0 0 .284-1.05zm-10.706 7.689a1 1 0 0 0-.311.957l2.097 9.695-8.574-4.99a.995.995 0 0 0-1.006 0l-8.576 4.99 2.097-9.695a1 1 0 0 0-.311-.957l-7.396-6.613 9.87-1.002c.358-.035.668-.264.814-.592l4.004-9.077 4.003 9.077c.146.328.456.557.814.592l9.87 1.002-7.395 6.613z"/></svg>
      </span>
      :
      <span className='absolute left-2 top-2 h-10 w-10 cursor-pointer' title='Add to Favorites' onClick={() => dispatch(addFavorites(item))} >
        <svg className='fill-blue-500 hover:fill-lime-500 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.09 36.09"><path d="M36.042 13.909a1.006 1.006 0 0 0-.85-.688l-11.549-1.172L18.96 1.43a1 1 0 0 0-1.83.002L12.446 12.05.899 13.221a1.003 1.003 0 0 0-.565 1.743l8.652 7.738-2.453 11.343a1 1 0 0 0 1.481 1.074l10.032-5.84 10.03 5.84a.997.997 0 0 0 1.091-.059 1 1 0 0 0 .391-1.02l-2.453-11.344 8.653-7.737a.992.992 0 0 0 .284-1.05zm-10.706 7.689a1 1 0 0 0-.311.957l2.097 9.695-8.574-4.99a.995.995 0 0 0-1.006 0l-8.576 4.99 2.097-9.695a1 1 0 0 0-.311-.957l-7.396-6.613 9.87-1.002c.358-.035.668-.264.814-.592l4.004-9.077 4.003 9.077c.146.328.456.557.814.592l9.87 1.002-7.395 6.613z"/></svg>
      </span>
      } 
    </div>

  )
}

export default ItemCard
