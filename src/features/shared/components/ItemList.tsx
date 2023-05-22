import { Item } from "../types/item"
import ItemCard from "./ItemCard"

type ItemListProps = {
  items: Item[]
}
const ItemList = ({items}: ItemListProps) => {
  return (
    <div className="overflow-x-auto mb-8">
      <div className="flex gap-x-6 w-max pb-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      </div>
    </div>
  )
}

export default ItemList