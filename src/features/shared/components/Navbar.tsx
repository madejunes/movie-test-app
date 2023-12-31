import { RootState } from '@/store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const router = useRouter()
  const isCurrentPage = (path: string, label: string) => {
    return (
      router.asPath === path ||
      router.asPath.includes(`/detail/${label.toLowerCase()}`)
    )
  }

  const favItems = useSelector((state: RootState) => state.favorites.favItem)

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Movie', path: '/movie' },
    { label: 'Tv', path: '/tv' },
    { label: 'Favorites', path: '/fav' },
    { label: 'Search', path: '/search' },
  ]

  return (
    <nav className="mb-4">
      <ul className="flex border-b">
        {links.map((link) => (
          <li
            key={link.label}
            className={`text-xl group ${
              isCurrentPage(link.path, link.label) ? 'active' : ''
            }`}
          >
            <Link
              className="block py-4 px-6 group-[.active]:bg-white group-[.active]:text-black hover:bg-white hover:text-black"
              href={link.path}
            >
              {link.label}
              {link.label === 'Favorites' && favItems.length
                ? `(${favItems.length})`
                : ''}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
