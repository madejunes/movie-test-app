import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const isCurrentPage = (path: string, label: string) => {
    return router.asPath === path || router.asPath.includes(`/detail/${label.toLowerCase()}`)
  }
  
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Movie', path: '/movie' },
    { label: 'Tv', path: '/tv' },
    { label: 'Search', path: '/search' },
  ]

  return (
    <nav className="mb-4">
      <ul className="flex border-b ">
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
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
