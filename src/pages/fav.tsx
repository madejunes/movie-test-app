import ItemList from '@/features/shared/components/ItemList'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export default function Fav() {
  const favItems = useSelector((state: RootState) => state.favorites.favItem)

  return (
    <div>
      {favItems.length ? (
        <ItemList items={favItems} />
      ) : (
        <p>No Favorites yet, add one!</p>
      )}
    </div>
  )
}
